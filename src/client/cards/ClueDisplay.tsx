import { Textfit } from "react-textfit";

import { Letter, OwnerType, CardLocation, PlayerViewG } from "../../game/types";

interface Props {
  g: PlayerViewG;
  spelling: (CardLocation | Letter)[];
}

const getLetterDisplay = (g: PlayerViewG, card: CardLocation | Letter) => {
  if (typeof card === "string") {
    return <>{card}</>;
  }

  const letters =
    card.owner.ownerType === OwnerType.TEAM
      ? g.teamLetters
      : g.players[+card.owner.playerID].letters;
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
    <Textfit mode="single" max="64">
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
