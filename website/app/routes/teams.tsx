import type { Player } from "~/database/schema";
import type { Route } from "./+types/teams";
import { database } from "~/database/context";
import { cn } from "~/utils/cn";
import { PlayerIcon } from "~/components/PlayerIcon";

export async function loader({ request }: Route.LoaderArgs) {
  const db = database();

  const allTeams = await db.query.teams.findMany({
    with: {
      players: true,
    },
  });

  const teamsWithFullPlayers = allTeams.map((team) => {
    const players = team.players ?? [];
    const filledPlayers: (Player | null)[] = [...players];
    while (filledPlayers.length < 15) {
      filledPlayers.push(null);
    }
    return { ...team, players: filledPlayers };
  });

  return { teams: teamsWithFullPlayers };
}

export default function Teams({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Teams</h1>
      <div className="flex flex-wrap gap-4">
        {loaderData.teams.map((team) => (
          <div
            key={team.id}
            className="flex flex-col gap-1 border-2 border-cell-gray/50 bg-cell-gray/40 rounded-lg p-4 w-60"
          >
            <p className="text-lg font-rodin font-bold text-center pb-2">
              {team.name}
            </p>
            {team.players &&
              team.players.map((player, index) => (
                <div className="flex items-center gap-4">
                  <PlayerIcon player={player} />
                  <p
                    key={player?.id || index}
                    className={cn(
                      "text-xs w-full",
                      !player && "italic opacity-60"
                    )}
                  >
                    {player?.name ?? "Empty"}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
