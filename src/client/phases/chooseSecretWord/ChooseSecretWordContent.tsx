import { useMemo, useState } from "react";
import _ from "lodash";
import { styled } from "@material-ui/core";

import { LETTERS_PER_PLAYER } from "../../../game/constants";
import { Letter } from "../../../game/types";
import { PresentedCard } from "../../cards/PresentedCard";
import { Bottombar } from "../../panels/Bottombar";
import { Button } from "../../panels/Button";
import { PanelLayout } from "../../panels/PanelLayout";

const SecretWordConstructionLetters = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "24px",
  marginRight: "24px",
  height: "fit-content",
});

interface Props {
  wordConstructionLetters: Record<Letter, number>;
  leftPlayerName: string;
  onConfirmSecretWord: (secretWord: Letter[]) => void;
}

export const ChooseSecretWordContent = (props: Props) => {
  const { wordConstructionLetters, leftPlayerName, onConfirmSecretWord } =
    props;

  const [selectedLetters, setSelectedLetters] = useState<[Letter, number][]>(
    []
  );
  const secretWord = useMemo(
    () => selectedLetters.map(([letter]) => letter),
    [selectedLetters]
  );
  const wordConstructionHand = _.sortBy(
    _.reduce(
      wordConstructionLetters as Record<Letter, number>,
      (result, value, key) =>
        value ? [...result, Array(value).fill(key)] : result,
      [] as Letter[][]
    ),
    (letters) => letters[0]
  );
  const wordConstructionCards = wordConstructionHand.map((specificLetters) =>
    specificLetters.map((letter, i) => {
      const letterSelectedAtIndex = _.findIndex(
        selectedLetters,
        ([l, idx]) => l === letter && idx === i
      );
      const containsToken =
        letterSelectedAtIndex === -1 ? [] : [letterSelectedAtIndex + 1];
      return (
        <PresentedCard
          key={`${letter}-${i}`}
          letter={letter}
          containsTokens={containsToken}
          onClick={
            letterSelectedAtIndex === -1
              ? () => setSelectedLetters((sl) => [...sl, [letter, i]])
              : undefined
          }
        />
      );
    })
  );

  return (
    <PanelLayout
      bottombar={
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
              Choose a secret 5-letter word for{" "}
              <strong>{leftPlayerName}</strong>.
            </div>
            <div style={{ fontSize: "48pt" }}>
              {secretWord.join(" ") || <>&nbsp;</>}
            </div>
          </div>
        </Bottombar>
      }
    >
      <SecretWordConstructionLetters>
        {wordConstructionCards}
      </SecretWordConstructionLetters>
    </PanelLayout>
  );
};
