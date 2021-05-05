import _ from "lodash";
import { Tooltip } from "@material-ui/core";

import { Letter, TeamHints } from "../../game/types";
import AvailableHint from "../assets/hints/available.svg";
import LockedHint from "../assets/hints/locked.svg";
import { Card } from "../cards/Card";
import theme from "../theme";
import { Hint } from "./hint";
import { PlayerInfo, PlayerStatus } from "./playerInfo";

interface Props {
  teamHints: TeamHints;
}

export const TeamDisplay = (props: Props) => {
  const { teamHints } = props;
  return (
    <PlayerInfo>
      <PlayerStatus>
        <div>Team</div>
        <div>
          {_.range(teamHints.available).map((_, i) => (
            <Tooltip
              key={`available-${i}`}
              title="This hint is available to players that have used all of their own hints."
            >
              <Hint src={AvailableHint} alt="Available hint" />
            </Tooltip>
          ))}
          {_.range(teamHints.locked).map((_, i) => (
            <Tooltip
              key={`locked-${i}`}
              title="This hint becomes available once every player uses all of their own hints."
            >
              <Hint src={LockedHint} alt="Locked hint" />
            </Tooltip>
          ))}
        </div>
      </PlayerStatus>
      <Card letter={Letter.WILD} backgroundColor={theme.grey} />
    </PlayerInfo>
  );
};
