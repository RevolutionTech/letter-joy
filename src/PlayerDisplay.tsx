import { styled } from "@material-ui/core";

import { Card } from "./Card";
import { PlayerState } from "./game";
import { PlayerHints } from "./PlayerHints";
import { PlayerInfo, PlayerStatus } from "./playerInfo";

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
      <PlayerStatus>
        <div>{playerName}</div>
        <PlayerHints
          playerID={playerID}
          playerName={playerName}
          hintsUsed={hintsUsed}
          teamHintsAvailable={teamHintsAvailable}
        />
      </PlayerStatus>
      <PlayerHand>
        {letters.map((letter, i) => (
          <Card key={`${playerID}-${i}`} letter={letter} visible={i === 0} />
        ))}
      </PlayerHand>
    </PlayerInfo>
  );
};
