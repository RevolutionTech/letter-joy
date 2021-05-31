import { BoardProps } from "boardgame.io/react";

import { Phase } from "../game/phases";
import { assertNever } from "../game/utils";
import { ChooseClueBoard } from "./phases/chooseClue/ChooseClueBoard";
import { ChooseSecretWordBoard } from "./phases/chooseSecretWord/ChooseSecretWordBoard";
import { ActiveClueBoard } from "./phases/activeClue/ActiveClueBoard";
import { RearrangeLettersBoard } from "./phases/rearrangeLetters/RearrangeLettersBoard";

const getBoardForPhase = (phase: Phase) => {
  switch (phase) {
    case Phase.CHOOSE_SECRET_WORD:
      return ChooseSecretWordBoard;
    case Phase.CHOOSE_CLUE:
      return ChooseClueBoard;
    case Phase.ACTIVE_CLUE:
      return ActiveClueBoard;
    case Phase.REARRANGE_LETTERS:
      return RearrangeLettersBoard;
    default:
      return assertNever(phase);
  }
};

export const LetterJoyBoard = (props: BoardProps) => {
  const phase = props.ctx.phase as Phase;
  const Board = getBoardForPhase(phase);
  return <Board {...props} />;
};
