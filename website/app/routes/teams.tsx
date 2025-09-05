import type { Route } from "./+types/teams";
import { database } from "~/database/context";
import { teams } from "~/database/schema";

export async function loader({ request }: Route.LoaderArgs) {
  const db = database();
  const allTeams = await db
    .select({
      id: teams.id,
      name: teams.name,
    })
    .from(teams);

  return { teams: allTeams };
}

export default function Teams({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Teams</h1>
      <ul className="flex flex-col gap-4">
        {loaderData.teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
}
