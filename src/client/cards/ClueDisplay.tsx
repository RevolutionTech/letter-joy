import { CardLocation, Spelling, PlayerViewG } from "../../game/types";

interface Props {
  g: PlayerViewG;
  spelling: Spelling;
}

const getLetterDisplay = (g: PlayerViewG, cardLocation: CardLocation) => {
  const { ownerID } = cardLocation;
  const letters =
    ownerID === "TEAM" ? g.teamLetters : g.players[+ownerID].letters;
  const letterIndex = cardLocation.letterIndex;
  const letter = (
    <>
      {letters[letterIndex] ?? (
        <>
          ?<sub>{letterIndex + 1}</sub>
        </>
      )}
    </>
  );
  return letter;
};

export const ClueDisplay = (props: Props) => {
  const { g, spelling } = props;
  return spelling.reduce(
    (display: React.ReactNode, cardLocation: CardLocation) => {
      const letterDisplay = getLetterDisplay(g, cardLocation);
      return display == null ? (
        letterDisplay
      ) : (
        <>
          {display} {letterDisplay}
        </>
      );
    },
    null
  );
};
