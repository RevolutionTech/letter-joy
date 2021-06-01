import { CardLocation } from "../../../game/types";

export const getDraggableId = (location: CardLocation) =>
  `${location.ownerID}-card-${location.letterIndex}`;
