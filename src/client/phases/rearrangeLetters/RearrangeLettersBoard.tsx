import { BoardProps } from "boardgame.io/react";

import { PlayerViewG } from "../../../game/types";
import { RearrangeLettersContent } from "./RearrangeLettersContent";
import { ScoringContent } from "./ScoringContent";

type RearrangeLettersStage =
  | "rearrangeLettersMain"
  | "unexpectedWord"
  | "scoring";

export const RearrangeLettersBoard = (props: BoardProps) => {
  const g: PlayerViewG = props.G;
  const currentPlayer = props.playerID;
  const activePlayers = props.ctx.activePlayers ?? {};
  const stage = ((currentPlayer && activePlayers[currentPlayer]) ??
    "scoring") as RearrangeLettersStage;

  return currentPlayer == null || stage === "scoring" ? (
    <ScoringContent g={g} activePlayers={activePlayers} />
  ) : (
    <RearrangeLettersContent
      g={g}
      currentPlayer={currentPlayer}
      stage={stage}
      onConfirmExpectedWord={props.moves.rearrangeLetters}
      onConfirmUnexpectedWord={props.moves.confirmUnexpectedWord}
    />
  );
};
