import { BoardProps } from "boardgame.io/react";

import { Card } from "./Card";
import { G } from "./game";

export const LetterJoyBoard = (props: BoardProps) => {
  const g: G = props.G;
  const cards = Object.values(g.players).map(({ letter }) => (
    <Card letter={letter} />
  ));
  return <>{cards}</>;
};
