import _ from "lodash";
import { Tooltip } from "@mui/material";
import { Chair } from "@mui/icons-material";

import { PlayerViewNonPlayerState } from "../../game/types";
import LockedHint from "../assets/hints/locked.svg";
import { CardPile } from "../cards/CardPile";
import { PresentedCard } from "../cards/PresentedCard";
import {
  DisplayCell,
  DisplayStatus,
  DisplayName,
  HandOfCards,
} from "./DisplayCell";
import { Hints, Hint } from "./hint";

interface Props extends PlayerViewNonPlayerState {
  nonPlayerIndex: number;
  containsTokens?: number[];
  onAddToSpelling?: () => void;
}

export const NonPlayerDisplay = (props: Props) => {
  const {
    letters,
    activeLetterIndex,
    nonPlayerIndex,
    containsTokens,
    onAddToSpelling,
  } = props;
  const numLetters = letters.length;
  if (numLetters > 0) {
    const numLettersRemaining = letters.length - activeLetterIndex - 1;
    return (
      <DisplayCell>
        <DisplayStatus>
          <Chair style={{ marginRight: "4px" }} />
          <DisplayName>Non-player {nonPlayerIndex + 1}</DisplayName>
          {numLettersRemaining > 0 && (
            <Hints>
              <Tooltip title="This hint becomes available once this non-player pile is exhausted.">
                <Hint src={LockedHint} alt="Locked hint" />
              </Tooltip>
            </Hints>
          )}
        </DisplayStatus>
        <HandOfCards>
          <PresentedCard
            letter={letters[activeLetterIndex]}
            active
            containsTokens={containsTokens}
            onClick={onAddToSpelling}
          />
          {numLettersRemaining > 3 ? (
            <CardPile numCards={numLettersRemaining} />
          ) : (
            _.slice(letters, activeLetterIndex + 1).map((_, i) => {
              return (
                <PresentedCard
                  key={`${nonPlayerIndex}-${activeLetterIndex + i}`}
                  letter={null}
                />
              );
            })
          )}
        </HandOfCards>
      </DisplayCell>
    );
  } else {
    return null;
  }
};