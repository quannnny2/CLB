import { PlayerIcon } from "~/components/PlayerIcon";
import type { Route } from "./+types/players";
import { database } from "~/database/context";
import { cn } from "~/utils/cn";

export async function loader({ request }: Route.LoaderArgs) {
  const db = database();
  const allPlayers = await db.query.players.findMany({
    with: {
      team: true,
    },
  });

  return { players: allPlayers };
}

export default function Players({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Players</h1>
      <div className="flex flex-wrap gap-4">
        {loaderData.players.map((player) => (
          <div
            key={player.id}
            className="relative flex flex-col items-center gap-2 p-4 border-2 border-cell-gray/50 rounded-lg w-36 h-23 bg-cell-gray/40"
          >
            <PlayerIcon player={player} />
            <span className="text-xs text-center">{player.name}</span>
            <span
              className={cn(
                "text-xs absolute top-1 right-1.5 opacity-50 rotate-8",
                player.team?.abbreviation ? "" : "text-green-300"
              )}
            >
              {player.team?.abbreviation ?? "Free"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
