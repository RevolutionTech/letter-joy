import { BoardProps } from "boardgame.io/react";

import { PlayerViewG } from "../../../game/types";
import { RearrangeLettersContent } from "./RearrangeLettersContent";

export const RearrangeLettersBoard = (props: BoardProps) => {
  const g: PlayerViewG = props.G;
  const currentPlayer = props.playerID;

  // TODO: Build scoring content
  return currentPlayer == null ? null : (
    <RearrangeLettersContent
      g={g}
      currentPlayer={currentPlayer}
      onConfirmExpectedWord={props.moves.rearrangeLetters}
    />
  );
};
