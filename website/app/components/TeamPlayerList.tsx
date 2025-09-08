import type { Player, Team } from "~/database/schema";
import { PlayerIcon } from "./PlayerIcon";
import { cn } from "~/utils/cn";

export function TeamPlayerList({
  team,
  size = "md",
}: {
  team: Team & { players: (Player | null)[] };
  size?: "md" | "sm";
}) {
  return (
    <div className={cn("flex flex-col", size === "md" ? "gap-2" : "gap-1.5")}>
      {team.players.map((player, index) => (
        <div className="flex items-center gap-4" key={player?.id || index}>
          <PlayerIcon player={player} />
          <p
            key={player?.id || index}
            className={cn(
              "text-xs w-full",
              size === "sm" ? "text-xs" : "text-sm",
              !player && "italic opacity-60"
            )}
          >
            {player?.name ?? "Empty"}
          </p>
        </div>
      ))}
    </div>
  );
}
