import { styled } from "@mui/material";
import { Textfit } from "react-textfit";

import {
  Letter,
  OwnerType,
  CardOwner,
  CardStack,
  CardLocation,
  PlayerViewG,
} from "../../game/types";
import { assertNever } from "../../game/utils";

const Subscript = styled("sub")({ fontSize: "60%" });

const getSingleLetterForOwner = (g: PlayerViewG, owner: CardOwner) => {
  const ownerType = owner.ownerType;
  if (ownerType === OwnerType.PLAYER) {
    return g.players[+owner.playerID].bonusLetter;
  } else {
    return Letter.WILD;
  }
};

const getLetterArrayForOwner = (g: PlayerViewG, owner: CardOwner) => {
  const ownerType = owner.ownerType;
  switch (ownerType) {
    case OwnerType.TEAM:
      return g.team.bonus;
    case OwnerType.NONPLAYER:
      return g.nonPlayers[owner.nonPlayerIndex];
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

  if (card.stack === CardStack.SINGLE) {
    return (
      getSingleLetterForOwner(g, card.owner) ?? (
        <>
          ?<Subscript>B</Subscript>
        </>
      )
    );
  } else {
    const letters = getLetterArrayForOwner(g, card.owner);
    const letter = (
      <>
        {letters[card.letterIndex] ?? (
          <>
            ?<Subscript>{card.letterIndex + 1}</Subscript>
          </>
        )}
      </>
    );
    return letter;
  }
};

interface Props {
  g: PlayerViewG;
  spelling: (CardLocation | Letter)[];
  maxFontSize?: number;
}

export const ClueDisplay = ({ g, spelling, maxFontSize = 64 }: Props) => (
  <Textfit mode="single" max={maxFontSize}>
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
