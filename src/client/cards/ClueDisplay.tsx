import { Letter, CardLocation, PlayerViewG } from "../../game/types";

interface Props {
  g: PlayerViewG;
  spelling: (CardLocation | Letter)[];
}

const getLetterDisplay = (g: PlayerViewG, card: CardLocation | Letter) => {
  if (typeof card === "string") {
    return <>{card}</>;
  }

  const { ownerID, letterIndex } = card;
  const letters =
    ownerID === "TEAM" ? g.teamLetters : g.players[+ownerID].letters;
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
  );
};
