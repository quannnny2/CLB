import type { Player } from "~/database/schema";
import { cn } from "~/utils/cn";

export function PlayerIcon({
  player,
}: {
  player?: Pick<Player, "imageUrl" | "name"> | null;
}) {
  const imageUrl =
    player?.imageUrl ?? "/images/players/sideview/right/mario.png";
  const alt = player?.name ?? "Blank Player";

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={cn(
        "w-[2rem] h-[2rem] object-fit drop-shadow-sm",
        player === null && "filter brightness-0 opacity-20"
      )}
    />
  );
}
