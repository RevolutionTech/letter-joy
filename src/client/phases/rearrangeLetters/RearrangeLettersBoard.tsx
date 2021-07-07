import { BoardProps } from "boardgame.io/react";

import { PlayerViewG } from "../../../game/types";
import { RearrangeLettersContent } from "./RearrangeLettersContent";

type RearrangeLettersStage =
  | "rearrangeLettersMain"
  | "unexpectedWord"
  | "scoring";

export const RearrangeLettersBoard = (props: BoardProps) => {
  const g: PlayerViewG = props.G;
  const currentPlayer = props.playerID;
  const stage = ((currentPlayer && props.ctx.activePlayers?.[currentPlayer]) ??
    "scoring") as RearrangeLettersStage;

  return currentPlayer == null || stage === "scoring" ? null : (
    <RearrangeLettersContent
      g={g}
      currentPlayer={currentPlayer}
      stage={stage}
      onConfirmExpectedWord={props.moves.rearrangeLetters}
      onConfirmUnexpectedWord={props.moves.confirmUnexpectedWord}
    />
  );
};
