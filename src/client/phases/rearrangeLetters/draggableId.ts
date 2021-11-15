import { CardLocation, OwnerType } from "../../../game/types";

export const getDraggableId = (location: CardLocation) => {
  const ownerId =
    location.owner.ownerType === OwnerType.TEAM
      ? "team"
      : `player-${location.owner.playerID}`;
  return `${ownerId}-card-${location.letterIndex}`;
};
