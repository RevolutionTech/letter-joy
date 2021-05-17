import { BoardProps } from "boardgame.io/react";

import { Phase } from "../game/types";
import { assertNever } from "../game/utils";
import { ChooseClueBoard } from "./phases/chooseClue/ChooseClueBoard";
import { ActiveClueBoard } from "./phases/activeClue/ActiveClueBoard";

const getBoardForPhase = (phase: Phase) => {
  switch (phase) {
    case Phase.CHOOSE_CLUE:
      return ChooseClueBoard;
    case Phase.ACTIVE_CLUE:
      return ActiveClueBoard;
    default:
      return assertNever(phase);
  }
};

export const LetterJoyBoard = (props: BoardProps) => {
  const phase = props.ctx.phase as Phase;
  const Board = getBoardForPhase(phase);
  return <Board {...props} />;
};
