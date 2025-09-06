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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {loaderData.players.map((player) => (
          <div
            key={player.id}
            className="flex flex-col items-center gap-2 p-4 border rounded-lg"
          >
            {player.imageUrl && (
              <img
                src={player.imageUrl}
                alt={player.name}
                className="w-16 h-16 object-cover"
              />
            )}
            <span className="text-sm text-center">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
