import _ from "lodash";
import { Tooltip } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";

import { Letter } from "../../game/types";
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

interface Props {
  letters: (Letter | null)[];
  nonPlayerIndex: number;
  containsTokens?: number[];
  onAddToSpelling?: () => void;
}

export const NonPlayerDisplay = (props: Props) => {
  const { letters, nonPlayerIndex, containsTokens, onAddToSpelling } = props;
  if (letters.length > 0) {
    const numLettersRemaining = letters.length - 1;
    return (
      <DisplayCell>
        <DisplayStatus>
          <ChairIcon style={{ marginRight: "4px" }} />
          <DisplayName>Non-player {nonPlayerIndex + 1}</DisplayName>
          {numLettersRemaining > 0 && (
            <Hints>
              <Tooltip
                title="This hint becomes available once this non-player pile is exhausted."
                PopperProps={{ disablePortal: true }}
              >
                <Hint src={LockedHint} alt="Locked hint" />
              </Tooltip>
            </Hints>
          )}
        </DisplayStatus>
        <HandOfCards>
          <PresentedCard
            letter={letters[0]}
            active
            containsTokens={containsTokens}
            onClick={onAddToSpelling}
          />
          {numLettersRemaining > 3 ? (
            <CardPile numCards={numLettersRemaining} />
          ) : (
            _.range(numLettersRemaining).map((i) => {
              return (
                <PresentedCard key={`${nonPlayerIndex}-${i}`} letter={null} />
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
