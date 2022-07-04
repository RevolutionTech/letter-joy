import {
  CardOwner,
  CardLocation,
  OwnerType,
  CardStack,
} from "../../../game/types";
import { assertNever } from "../../../game/utils";

const getOwnerId = (owner: CardOwner) => {
  const ownerType = owner.ownerType;
  switch (ownerType) {
    case OwnerType.TEAM:
      return "team";
    case OwnerType.NONPLAYER:
      return `nonplayer-${owner.nonPlayerIndex}`;
    case OwnerType.PLAYER:
      return `player-${owner.playerID}`;
    default:
      return assertNever(ownerType);
  }
};

export const getDraggableId = (location: CardLocation) => {
  const ownerId = getOwnerId(location.owner);
  const letterIndex =
    location.stack === CardStack.ARRAY ? `-${location.letterIndex}` : "";
  return `${ownerId}-card-${location.stack}${letterIndex}`;
};
