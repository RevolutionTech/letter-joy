import {
  Letter,
  ClueTokenPlayerLocation,
  ClueTokenLocation,
  ClueTokenPlacement,
  PlayerViewG,
} from "../../game/types";

interface Props {
  g: PlayerViewG;
  tokenPlacement: ClueTokenPlacement;
}

const getLetterDisplay = (
  g: PlayerViewG,
  clueTokenLocation: ClueTokenLocation
) => {
  const { ownerID } = clueTokenLocation;
  if (ownerID === "TEAM") {
    return <>{Letter.WILD}</>;
  } else {
    // TODO: Surely there is a way to avoid this assertion
    const letterIndex = (clueTokenLocation as ClueTokenPlayerLocation)
      .letterIndex;
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
  const { g, tokenPlacement } = props;
  return tokenPlacement.reduce(
    (display: React.ReactNode, clueTokenLocation: ClueTokenLocation) => {
      const letterDisplay = getLetterDisplay(g, clueTokenLocation);
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
