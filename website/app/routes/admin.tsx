import { redirect, Form } from "react-router";
import type { Route } from "./+types/admin";
import { requireUser } from "~/auth.server";
import { database } from "~/database/context";
import { players, teams } from "~/database/schema";
import { eq, isNull } from "drizzle-orm";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireUser(request);

  if (user.role !== "admin") {
    throw redirect("/");
  }

  return { user };
}

export async function action({ request }: Route.ActionArgs) {
  const user = await requireUser(request);

  if (user.role !== "admin") {
    throw redirect("/");
  }

  const formData = await request.formData();
  const intent = formData.get("intent");
  const db = database();

  if (intent === "wipe-teams") {
    // Set all players' teamId to null
    await db.update(players).set({ teamId: null });
    return { success: true, message: "All players removed from teams" };
  }

  if (intent === "random-assign") {
    try {
      const result = await db.transaction(async (tx) => {
        // Get all teams
        const allTeams = await tx.select({ id: teams.id }).from(teams);

        // Get all players without teams
        const unassignedPlayers = await tx
          .select({ id: players.id })
          .from(players)
          .where(isNull(players.teamId));

        if (unassignedPlayers.length === 0) {
          return { success: false, message: "No unassigned players found" };
        }

        // Shuffle the unassigned players array
        const shuffledPlayers = [...unassignedPlayers].sort(
          () => Math.random() - 0.5
        );

        let teamIndex = 0;
        const maxPlayersPerTeam = 15;

        // Get current team sizes
        const teamSizes = new Map();
        for (const team of allTeams) {
          const currentPlayers = await tx
            .select({ id: players.id })
            .from(players)
            .where(eq(players.teamId, team.id));
          teamSizes.set(team.id, currentPlayers.length);
        }

        // Assign players to teams
        for (const player of shuffledPlayers) {
          // Find a team that has space
          let assigned = false;
          let attempts = 0;

          while (!assigned && attempts < allTeams.length) {
            const currentTeam = allTeams[teamIndex];
            const currentSize = teamSizes.get(currentTeam.id) || 0;

            if (currentSize < maxPlayersPerTeam) {
              await tx
                .update(players)
                .set({ teamId: currentTeam.id })
                .where(eq(players.id, player.id));

              teamSizes.set(currentTeam.id, currentSize + 1);
              assigned = true;
            }

            teamIndex = (teamIndex + 1) % allTeams.length;
            attempts++;
          }

          // If no team has space, stop assigning
          if (!assigned) {
            break;
          }
        }

        return { success: true, message: "Players randomly assigned to teams" };
      });

      return result;
    } catch (error) {
      console.error("Error during random assignment:", error);
      return { success: false, message: "Failed to assign players to teams" };
    }
  }

  return { success: false, message: "Invalid action" };
}

export default function Admin({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, {loaderData.user.name}</p>

      {actionData?.message && (
        <div
          className={`p-4 rounded mb-4 ${actionData.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {actionData.message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Team Management</h2>

          <Form method="post" className="inline-block mr-4">
            <input type="hidden" name="intent" value="wipe-teams" />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={(e) => {
                if (
                  !confirm(
                    "Are you sure you want to remove all players from teams? This cannot be undone."
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              Wipe All Teams
            </button>
          </Form>

          <Form method="post" className="inline-block">
            <input type="hidden" name="intent" value="random-assign" />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Randomly Assign Players
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
