import { useMemo, useState } from "react";
import { styled } from "@material-ui/core";

import { LETTERS_PER_PLAYER } from "../../../game/constants";
import { Letter } from "../../../game/types";
import { Button } from "../../common/Button";
import { Card } from "../../cards/Card";
import theme from "../../theme";
import {
  BOTTOMBAR_PADDING,
  Bottombar,
  BottombarPlaceholder,
} from "./Bottombar";

const GameTable = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  backgroundColor: theme.silver,
});

const SecretWordConstructionLetters = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "48px",
  marginRight: "48px",
});

const BottombarContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: `calc(100% - ${BOTTOMBAR_PADDING} * 2)`,
  height: "100%",
});

const BottombarButtons = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
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
          <Card
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
      <GameTable>
        <SecretWordConstructionLetters>
          {wordConstructionCards}
        </SecretWordConstructionLetters>
        <BottombarPlaceholder />
      </GameTable>
      <Bottombar>
        <BottombarContent>
          <div>
            <div style={{ fontSize: "36pt" }}>
              Choose a secret 5-letter word for{" "}
              <strong>{leftPlayerName}</strong>.
            </div>
            <div style={{ fontSize: "48pt" }}>
              {secretWord.join(" ") || <>&nbsp;</>}
            </div>
          </div>
          <BottombarButtons>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ marginBottom: "32px" }}
              disabled={selectedLetters.length !== LETTERS_PER_PLAYER}
              onClick={() => onConfirmSecretWord(secretWord)}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              size="large"
              disabled={selectedLetters.length === 0}
              onClick={() => setSelectedLetters([])}
            >
              Reset
            </Button>
          </BottombarButtons>
        </BottombarContent>
      </Bottombar>
    </>
  );
};
