import _ from "lodash";
import { Tooltip } from "@mui/material";

import { NUM_HINTS_STARTING_PER_PLAYER } from "../../game/constants";
import AvailableHint from "../assets/hints/available.svg";
import UnusedHint from "../assets/hints/unused.svg";
import UsedHint from "../assets/hints/used.svg";
import { Hint } from "./hint";

interface Props {
  playerID: string;
  playerName: string;
  numPlayers: number;
  hintsUsed: number;
  teamHintsAvailable: number;
}

export const PlayerHints = (props: Props) => {
  const { playerID, playerName, numPlayers, hintsUsed, teamHintsAvailable } =
    props;
  const hintsUnused =
    _.max([NUM_HINTS_STARTING_PER_PLAYER[numPlayers] - hintsUsed, 0]) ?? 0;

  return (
    <div>
      {_.range(hintsUsed).map((_, i) => (
        <Tooltip
          key={`${playerID}-used-${i}`}
          title={`This hint was used by ${playerName}.`}
        >
          <Hint src={UsedHint} alt="Used hint" />
        </Tooltip>
      ))}
      {_.range(hintsUnused).map((_, i) => (
        <Tooltip
          key={`${playerID}-unused-${i}`}
          title={`This hint is available only to ${playerName}.`}
        >
          <Hint src={UnusedHint} alt="Unused hint" />
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
