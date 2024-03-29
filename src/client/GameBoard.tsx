import { BoardProps } from "boardgame.io/react";
import { styled } from "@mui/material";

import { Phase } from "../game/phases";
import { assertNever } from "../game/utils";
import { LetterNotes } from "./panels/LetterNotes";
import { ChooseClueBoard } from "./phases/chooseClue/ChooseClueBoard";
import { ChooseSecretWordBoard } from "./phases/chooseSecretWord/ChooseSecretWordBoard";
import { ActiveClueBoard } from "./phases/activeClue/ActiveClueBoard";
import { RearrangeLettersBoard } from "./phases/rearrangeLetters/RearrangeLettersBoard";

const PanelWrapper = styled("div")({
  position: "fixed",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const PanelContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const getBoardForPhase = (phase: Phase | null) => {
  switch (phase) {
    case Phase.CHOOSE_SECRET_WORD:
      return ChooseSecretWordBoard;
    case Phase.CHOOSE_CLUE:
      return ChooseClueBoard;
    case Phase.ACTIVE_CLUE:
      return ActiveClueBoard;
    case Phase.REARRANGE_LETTERS:
    case null:
      return RearrangeLettersBoard;
    default:
      return assertNever(phase);
  }
};

export const GameBoard = (props: BoardProps) => {
  const phase = props.ctx.phase as Phase | null;
  const Board = getBoardForPhase(phase);
  return (
    <PanelWrapper>
      <PanelContainer>
        <Board {...props} />
        {props.playerID != null && phase !== Phase.CHOOSE_SECRET_WORD && (
          <LetterNotes
            activeLetter={props.G.players[+props.playerID].activeLetter}
            notes={props.G.letterNotes}
            onUpdateNote={props.moves.updateNote}
          />
        )}
      </PanelContainer>
    </PanelWrapper>
  );
};
