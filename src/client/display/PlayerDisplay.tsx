import { styled } from "@material-ui/core";

import { PlayerViewPlayerState } from "../../game/types";
import { Card } from "../cards/Card";
import { PlayerHints } from "./PlayerHints";
import { PlayerInfo, PlayerStatus } from "./playerInfo";

const PlayerHand = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

interface Props extends PlayerViewPlayerState {
  teamHintsAvailable: number;
  containsTokens?: number[];
  onAddToClue?: () => void;
}

export const PlayerDisplay = (props: Props) => {
  const {
    playerID,
    playerName,
    letters,
    activeLetterIndex,
    hintsUsed,
    teamHintsAvailable,
    containsTokens,
    onAddToClue,
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
        {letters.map((letter, i) => {
          const active = i === activeLetterIndex;
          return (
            <Card
              key={`${playerID}-${i}`}
              letter={letter}
              active={active}
              containsTokens={active ? containsTokens : undefined}
              onClick={letter == null ? undefined : onAddToClue}
            />
          );
        })}
      </PlayerHand>
    </PlayerInfo>
  );
};
