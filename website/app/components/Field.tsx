import type { FieldingPosition, Player, TeamLineup } from "~/database/schema";
import { PlayerIcon } from "./PlayerIcon";

export function Field({
  players,
}: {
  players: (Player & { lineup?: TeamLineup })[];
}) {
  console.log(players);
  const getPlayer = (position: FieldingPosition) => {
    return players.find(
      (player) => player.lineup?.fieldingPosition === position
    );
  };

  const Position = ({ position }: { position: FieldingPosition }) => {
    let offset = "";
    switch (position) {
      case "LF":
        offset = "translate-y-8";
        break;
      case "RF":
        offset = "translate-y-8";
        break;
      case "SS":
        offset = "-translate-x-4";
        break;
      case "2B":
        offset = "translate-x-4";
        break;
    }

    return (
      <div
        className={`field-${position.toLowerCase()} flex relative flex-col gap-0.5 items-center justify-center ${offset}`}
      >
        <svg viewBox="0 0 40 40" className="absolute top-0 left-0 z-0">
          <circle cx={20} cy={20} r={20} fill="white" fillOpacity={0.2} />
        </svg>
        <PlayerIcon player={getPlayer(position)} />
        <span className="text-[0.65rem] opacity-75 translate-y-2">
          {position}
        </span>
      </div>
    );
  };

  return (
    <div className="relative field w-80 h-80 text-center">
      {["LF", "CF", "RF", "SS", "2B", "P", "3B", "1B", "C"].map((position) => (
        <Position key={position} position={position as FieldingPosition} />
      ))}
      <svg viewBox="0 0 300 300" className="absolute -z-10 w-full h-full">
        <path
          d="M 0 130 
            Q 150 -100 300 130 
            L 150 280 
            Z"
          fill="var(--color-white)"
          fillOpacity="0.25"
          stroke="var(--color-blue-900)"
          strokeOpacity="0.5"
          stroke-width="4"
        />
      </svg>
    </div>
  );
}
