import {
  Letter,
  PlayerCardLocation,
  CardLocation,
  Spelling,
  PlayerViewG,
} from "../../game/types";

interface Props {
  g: PlayerViewG;
  spelling: Spelling;
}

const getLetterDisplay = (g: PlayerViewG, cardLocation: CardLocation) => {
  const { ownerID } = cardLocation;
  if (ownerID === "TEAM") {
    return <>{Letter.WILD}</>;
  } else {
    // TODO: Surely there is a way to avoid this assertion
    const letterIndex = (cardLocation as PlayerCardLocation).letterIndex;
    const player = g.players[+ownerID];
    const letter = (
      <>
        {player.letters[letterIndex] ?? (
          <>
            ?<sub>{letterIndex + 1}</sub>
          </>
        )}
      </>
    );
    return letter;
  }
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
