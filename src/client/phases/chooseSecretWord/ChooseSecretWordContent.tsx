import { useMemo, useState } from "react";
import { styled } from "@material-ui/core";

import { LETTERS_PER_PLAYER } from "../../../game/constants";
import { Letter } from "../../../game/types";
import { PresentedCard } from "../../cards/PresentedCard";
import { FullWidthGameTable } from "../../display/GameTable";
import { Bottombar, BottombarPlaceholder } from "../../panels/Bottombar";
import { Button } from "../../panels/Button";

const SecretWordConstructionLetters = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "48px",
  marginRight: "48px",
});

interface Props {
  wordConstructionLetters: Letter[];
  leftPlayerName: string;
  onConfirmSecretWord: (secretWord: Letter[]) => void;
}

export const ChooseSecretWordContent = (props: Props) => {
  const {
    wordConstructionLetters,
    leftPlayerName,
    onConfirmSecretWord,
  } = props;

  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const secretWord = useMemo(
    () => selectedLetters.map((i) => wordConstructionLetters[i]),
    [wordConstructionLetters, selectedLetters]
  );
  const wordConstructionCards = useMemo(
    () =>
      wordConstructionLetters.map((letter, i) => {
        const letterSelectedAtIndex = selectedLetters.indexOf(i);
        const containsToken =
          letterSelectedAtIndex === -1 ? [] : [letterSelectedAtIndex + 1];
        return (
          <PresentedCard
            key={i}
            letter={letter}
            containsTokens={containsToken}
            onClick={
              letterSelectedAtIndex === -1
                ? () => setSelectedLetters((letters) => [...letters, i])
                : undefined
            }
          />
        );
      }),
    [wordConstructionLetters, selectedLetters]
  );

  return (
    <>
      <FullWidthGameTable>
        <SecretWordConstructionLetters>
          {wordConstructionCards}
        </SecretWordConstructionLetters>
        <BottombarPlaceholder />
      </FullWidthGameTable>
      <Bottombar
        buttons={[
          <Button
            key="confirm"
            variant="contained"
            color="primary"
            size="large"
            disabled={selectedLetters.length !== LETTERS_PER_PLAYER}
            onClick={() => onConfirmSecretWord(secretWord)}
          >
            Confirm
          </Button>,
          <Button
            key="reset"
            variant="outlined"
            size="large"
            disabled={selectedLetters.length === 0}
            onClick={() => setSelectedLetters([])}
          >
            Reset
          </Button>,
        ]}
      >
        <div>
          <div style={{ fontSize: "36pt" }}>
            Choose a secret 5-letter word for <strong>{leftPlayerName}</strong>.
          </div>
          <div style={{ fontSize: "48pt" }}>
            {secretWord.join(" ") || <>&nbsp;</>}
          </div>
        </div>
      </Bottombar>
    </>
  );
};
