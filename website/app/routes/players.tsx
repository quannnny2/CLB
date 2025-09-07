import type { Route } from "./+types/players";
import { database } from "~/database/context";
import { players } from "~/database/schema";

export async function loader({ request }: Route.LoaderArgs) {
  const db = database();
  const allPlayers = await db
    .select({
      id: players.id,
      name: players.name,
      imageUrl: players.imageUrl,
    })
    .from(players);

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
            className="flex flex-col items-center gap-2 p-4 border-2 border-cell-gray/50 rounded-lg w-36 h-23 bg-cell-gray/40"
          >
            {player.imageUrl && (
              <img
                src={player.imageUrl}
                alt={player.name}
                className="w-10 h-10 object-cover drop-shadow-sm"
              />
            )}
            <span className="text-xs text-center">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
