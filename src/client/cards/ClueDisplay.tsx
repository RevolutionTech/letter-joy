import { Textfit } from "react-textfit";

import {
  Letter,
  OwnerType,
  CardOwner,
  CardLocation,
  PlayerViewG,
} from "../../game/types";
import { assertNever } from "../../game/utils";

interface Props {
  g: PlayerViewG;
  spelling: (CardLocation | Letter)[];
}

const getLettersForOwner = (g: PlayerViewG, owner: CardOwner) => {
  const ownerType = owner.ownerType;
  switch (ownerType) {
    case OwnerType.TEAM:
      return g.teamLetters;
    case OwnerType.NONPLAYER:
      return g.nonPlayers[owner.nonPlayerIndex].letters;
    case OwnerType.PLAYER:
      return g.players[+owner.playerID].letters;
    default:
      return assertNever(ownerType);
  }
};

const getLetterDisplay = (g: PlayerViewG, card: CardLocation | Letter) => {
  if (typeof card === "string") {
    return <>{card}</>;
  }

  const letters = getLettersForOwner(g, card.owner);
  const letter = (
    <>
      {letters[card.letterIndex] ?? (
        <>
          ?<sub>{card.letterIndex + 1}</sub>
        </>
      )}
    </>
  );
  return letter;
};

export const ClueDisplay = (props: Props) => {
  const { g, spelling } = props;
  return (
    <Textfit mode="single" max={64}>
      {spelling.reduce(
        (display: React.ReactNode, card: CardLocation | Letter) => {
          const letterDisplay = getLetterDisplay(g, card);
          return display == null ? (
            letterDisplay
          ) : (
            <>
              {display} {letterDisplay}
            </>
          );
        },
        null
      )}
    </Textfit>
  );
};
