import _ from "lodash";
import { Tooltip } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import {
  Letter,
  CardLocation,
  Spelling,
  Team,
  OwnerType,
  CardStack,
} from "../../game/types";
import LockedHint from "../assets/hints/locked.svg";
import UnusedHint from "../assets/hints/unused.svg";
import { PresentedCard } from "../cards/PresentedCard";
import {
  DisplayCell,
  DisplayStatus,
  DisplayName,
  HandOfCards,
} from "./DisplayCell";
import { Hints, HINT_STYLES } from "./hint";
import { getTokensAtLocation } from "../cards/spelling";

interface Props {
  team: Team;
  spelling?: Spelling;
  onAddToSpelling?: (cardLocation: CardLocation) => void;
}

export const TeamDisplay = (props: Props) => {
  const { team, spelling, onAddToSpelling } = props;
  const { wild, bonus, hints } = team;
  const wildLocation = {
    owner: { ownerType: OwnerType.TEAM },
    stack: CardStack.SINGLE,
  } as CardLocation;

  return wild != null || bonus.length > 0 ? (
    <DisplayCell>
      <DisplayStatus>
        <EmojiEventsIcon style={{ marginRight: "4px" }} />
        <DisplayName>Team</DisplayName>
        <Hints>
          {_.range(hints.available).map((_, i) => (
            <Tooltip
              key={`unused-${i}`}
              title="This hint is available to players that have used all of their own hints."
              PopperProps={{ disablePortal: true }}
            >
              <UnusedHint style={HINT_STYLES} />
            </Tooltip>
          ))}
          {_.range(hints.locked).map((_, i) => (
            <Tooltip
              key={`locked-${i}`}
              title="This hint becomes available once every player uses all of their own hints."
              PopperProps={{ disablePortal: true }}
            >
              <LockedHint style={HINT_STYLES} />
            </Tooltip>
          ))}
        </Hints>
      </DisplayStatus>
      <HandOfCards>
        {wild != null && (
          <PresentedCard
            letter={Letter.WILD}
            destinedOwner={OwnerType.TEAM}
            containsTokens={
              spelling && getTokensAtLocation(spelling, wildLocation)
            }
            onClick={onAddToSpelling && (() => onAddToSpelling(wildLocation))}
          />
        )}
        {bonus.map((letter, i) => {
          const cardLocation = {
            owner: { ownerType: OwnerType.TEAM },
            stack: CardStack.ARRAY,
            letterIndex: i,
          } as CardLocation;
          return (
            <PresentedCard
              key={i}
              letter={letter}
              destinedOwner={OwnerType.TEAM}
              containsTokens={
                spelling && getTokensAtLocation(spelling, cardLocation)
              }
              onClick={onAddToSpelling && (() => onAddToSpelling(cardLocation))}
            />
          );
        })}
      </HandOfCards>
    </DisplayCell>
  ) : null;
};
