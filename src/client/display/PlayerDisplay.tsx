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
          const letterDisplayed = active ? letter : null;
          return (
            <Card
              key={`${playerID}-${i}`}
              letter={letterDisplayed}
              active={active}
              containsTokens={active ? containsTokens : undefined}
              onClick={letterDisplayed == null ? undefined : onAddToClue}
            />
          );
        })}
      </PlayerHand>
    </PlayerInfo>
  );
};
