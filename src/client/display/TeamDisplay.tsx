import _ from "lodash";
import { Tooltip } from "@mui/material";

import { Letter, Team } from "../../game/types";
import LockedHint from "../assets/hints/locked.svg";
import UnusedHint from "../assets/hints/unused.svg";
import { PresentedCard } from "../cards/PresentedCard";
import { DisplayCell, DisplayStatus, DisplayName } from "./DisplayCell";
import { Hints, Hint } from "./hint";

interface Props {
  team: Team;
  containsTokens?: number[]; // TODO: Add support for team bonus letters
  onAddToSpelling?: () => void; // TODO: Add support for team bonus letters
}

export const TeamDisplay = (props: Props) => {
  const { team, containsTokens, onAddToSpelling } = props;
  const { wild, bonus, hints } = team;
  return wild != null || bonus.length > 0 ? (
    <DisplayCell>
      <DisplayStatus>
        <DisplayName>Team</DisplayName>
        <Hints>
          {_.range(hints.available).map((_, i) => (
            <Tooltip
              key={`unused-${i}`}
              title="This hint is available to players that have used all of their own hints."
              PopperProps={{ disablePortal: true }}
            >
              <Hint src={UnusedHint} alt="Unused hint" />
            </Tooltip>
          ))}
          {_.range(hints.locked).map((_, i) => (
            <Tooltip
              key={`locked-${i}`}
              title="This hint becomes available once every player uses all of their own hints."
              PopperProps={{ disablePortal: true }}
            >
              <Hint src={LockedHint} alt="Locked hint" />
            </Tooltip>
          ))}
        </Hints>
      </DisplayStatus>
      {wild != null && (
        <PresentedCard
          letter={Letter.WILD}
          containsTokens={containsTokens}
          onClick={onAddToSpelling}
        />
      )}
      {bonus.map((letter, i) => (
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
