import _ from "lodash";
import { Tooltip } from "@mui/material";

import { Letter, TeamHints } from "../../game/types";
import AvailableHint from "../assets/hints/available.svg";
import LockedHint from "../assets/hints/locked.svg";
import { PresentedCard } from "../cards/PresentedCard";
import { DisplayCell, DisplayStatus, DisplayName } from "./DisplayCell";
import { Hint } from "./hint";

interface Props {
  teamLetters: Letter[];
  teamHints: TeamHints;
  containsTokens?: number[]; // TODO: Add support for multiple team letters
  onAddToSpelling?: () => void; // TODO: Add support for multiple team letters
}

export const TeamDisplay = (props: Props) => {
  const { teamLetters, teamHints, containsTokens, onAddToSpelling } = props;
  return teamLetters.length > 0 ? (
    <DisplayCell>
      <DisplayStatus>
        <DisplayName>Team</DisplayName>
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
      </DisplayStatus>
      {teamLetters.map((letter, i) => (
        <PresentedCard
          key={i}
          letter={letter}
          containsTokens={containsTokens}
          onClick={onAddToSpelling}
        />
      ))}
    </DisplayCell>
  ) : null;
};
