import { BoardProps } from "boardgame.io/react";

import { G } from "./game";
import { PlayerDisplay } from "./PlayerDisplay";

export const LetterJoyBoard = (props: BoardProps) => {
  const g: G = props.G;
  const playerDisplays = Object.values(g.players).map((playerState) => (
    <PlayerDisplay {...playerState} />
  ));
  return <>{playerDisplays}</>;
};
