import { styled } from "@material-ui/core";

import { Card } from "./Card";
import { PlayerState } from "./game";
import { PlayerHints } from "./PlayerHints";

const PlayerInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  marginLeft: "32px",
  marginTop: "48px",
  fontSize: "28pt",
});

const PlayerPublicInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "248px",
  marginRight: "32px",
});

const PlayerHand = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

interface Props extends PlayerState {
  teamHintsAvailable: number;
}

export const PlayerDisplay = (props: Props) => {
  const {
    playerID,
    playerName,
    letters,
    hintsUsed,
    teamHintsAvailable,
  } = props;
  return (
    <PlayerInfo>
      <PlayerPublicInfo>
        <div>{playerName}</div>
        <PlayerHints
          playerID={playerID}
          playerName={playerName}
          hintsUsed={hintsUsed}
          teamHintsAvailable={teamHintsAvailable}
        />
      </PlayerPublicInfo>
      <PlayerHand>
        {letters.map((letter, i) => (
          <Card key={`${playerID}-${i}`} letter={letter} visible={i === 0} />
        ))}
      </PlayerHand>
    </PlayerInfo>
  );
};
