import type { Stats } from "~/database/schema";

export function PlayerInfo({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg border-b border-gray-300 pb-1">
          Basic Info
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Character:</span>
            <span className="font-medium">{stats.character}</span>
          </div>
          <div className="flex justify-between">
            <span>Class:</span>
            <span className="font-medium">{stats.characterClass}</span>
          </div>
          <div className="flex justify-between">
            <span>Captain:</span>
            <span className="font-medium">{stats.captain ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between">
            <span>Weight:</span>
            <span className="font-medium">{stats.weight}</span>
          </div>
          <div className="flex justify-between">
            <span>Ability:</span>
            <span className="font-medium">{stats.ability}</span>
          </div>
          <div className="flex justify-between">
            <span>Speed:</span>
            <span className="font-medium">{stats.speed}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg border-b border-gray-300 pb-1">
          Batting
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Stance:</span>
            <span className="font-medium">{stats.battingStance}</span>
          </div>
          <div className="flex justify-between">
            <span>Trajectory:</span>
            <span className="font-medium">{stats.hittingTrajectory}</span>
          </div>
          <div className="flex justify-between">
            <span>Slap Contact:</span>
            <span className="font-medium">{stats.slapHitContactSize}</span>
          </div>
          <div className="flex justify-between">
            <span>Charge Contact:</span>
            <span className="font-medium">{stats.chargeHitContactSize}</span>
          </div>
          <div className="flex justify-between">
            <span>Slap Power:</span>
            <span className="font-medium">{stats.slapHitPower}</span>
          </div>
          <div className="flex justify-between">
            <span>Charge Power:</span>
            <span className="font-medium">{stats.chargeHitPower}</span>
          </div>
          <div className="flex justify-between">
            <span>Bunting:</span>
            <span className="font-medium">{stats.bunting}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg border-b border-gray-300 pb-1">
          Pitching & Fielding
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Throwing Arm:</span>
            <span className="font-medium">{stats.throwingArm}</span>
          </div>
          <div className="flex justify-between">
            <span>Throwing Speed:</span>
            <span className="font-medium">{stats.throwingSpeed}</span>
          </div>
          <div className="flex justify-between">
            <span>Fielding:</span>
            <span className="font-medium">{stats.fielding}</span>
          </div>
          <div className="flex justify-between">
            <span>Fastball Speed:</span>
            <span className="font-medium">{stats.fastballSpeed}</span>
          </div>
          <div className="flex justify-between">
            <span>Curveball Speed:</span>
            <span className="font-medium">{stats.curveballSpeed}</span>
          </div>
          <div className="flex justify-between">
            <span>Curve:</span>
            <span className="font-medium">{stats.curve}</span>
          </div>
          <div className="flex justify-between">
            <span>Stamina:</span>
            <span className="font-medium">{stats.stamina}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-lg border-b border-gray-300 pb-1">
          Displayed Stats
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Pitching:</span>
            <span className="font-medium">{stats.pitchingCss}</span>
          </div>
          <div className="flex justify-between">
            <span>Batting:</span>
            <span className="font-medium">{stats.battingCss}</span>
          </div>
          <div className="flex justify-between">
            <span>Fielding:</span>
            <span className="font-medium">{stats.fieldingCss}</span>
          </div>
          <div className="flex justify-between">
            <span>Speed:</span>
            <span className="font-medium">{stats.speedCss}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
