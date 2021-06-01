import { Letter } from "../../../game/types";

export enum CardOrigin {
  PLAYER = "player",
  BONUS = "bonus",
}

export interface SortableCard {
  origin: CardOrigin;
  index: number;
  letter: Letter | null;
}

export const getSortableCardId = (card: SortableCard) =>
  `${card.origin}-card-${card.index}`;
