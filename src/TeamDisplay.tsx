import _ from "lodash";
import { Tooltip } from "@material-ui/core";

import AvailableHint from "./assets/hints/available.svg";
import LockedHint from "./assets/hints/locked.svg";
import { Card } from "./Card";
import { TeamHints } from "./game";
import { Hint } from "./hint";
import { Letter } from "./letters";
import { PlayerInfo, PlayerStatus } from "./playerInfo";
import theme from "./theme";

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
            <Tooltip title="This hint is available to players that have used all of their own hints.">
              <Hint
                key={`available-${i}`}
                src={AvailableHint}
                alt="Available hint"
              />
            </Tooltip>
          ))}
          {_.range(teamHints.locked).map((_, i) => (
            <Tooltip title="This hint becomes available once every player uses all of their own hints.">
              <Hint key={`locked-${i}`} src={LockedHint} alt="Locked hint" />
            </Tooltip>
          ))}
        </div>
      </PlayerStatus>
      <Card letter={Letter.WILD} visible backgroundColor={theme.grey} />
    </PlayerInfo>
  );
};
