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

const getLettersForOwner = (g: PlayerViewG, owner: CardOwner) => {
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

  if (
    card.owner.ownerType === OwnerType.TEAM &&
    card.stack === CardStack.SINGLE
  ) {
    return Letter.WILD;
  }

  const letters = getLettersForOwner(g, card.owner);
  const letterIndex = card.stack === CardStack.SINGLE ? 0 : card.letterIndex;
  const letter = (
    <>
      {letters[letterIndex] ?? (
        <>
          ?<Subscript>{letterIndex + 1}</Subscript>
        </>
      )}
    </>
  );
  return letter;
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
