import _ from "lodash";
import { Tooltip } from "@material-ui/core";

import AvailableHint from "./assets/hints/available.svg";
import UnusedHint from "./assets/hints/unused.svg";
import UsedHint from "./assets/hints/used.svg";
import { NUM_HINTS_STARTING_PER_PLAYER } from "./constants";
import { Hint } from "./hint";

interface Props {
  playerID: string;
  playerName: string;
  hintsUsed: number;
  teamHintsAvailable: number;
}

export const PlayerHints = (props: Props) => {
  const { playerID, playerName, hintsUsed, teamHintsAvailable } = props;
  const hintsUnused =
    _.max([NUM_HINTS_STARTING_PER_PLAYER - hintsUsed, 0]) ?? 0;

  return (
    <div>
      {_.range(hintsUsed).map((_, i) => (
        <Tooltip title={`This hint was used by ${playerName}.`}>
          <Hint key={`${playerID}-used-${i}`} src={UsedHint} alt="Used hint" />
        </Tooltip>
      ))}
      {_.range(hintsUnused).map((_, i) => (
        <Tooltip title={`This hint is available only to ${playerName}.`}>
          <Hint
            key={`${playerID}-unused-${i}`}
            src={UnusedHint}
            alt="Unused hint"
          />
        </Tooltip>
      ))}
      {hintsUnused === 0 && teamHintsAvailable > 0 && (
        <Tooltip
          title={`${playerName} can still give a clue by using one of the team's shared hints.`}
        >
          <Hint src={AvailableHint} alt="Available hint" />
        </Tooltip>
      )}
    </div>
  );
};
