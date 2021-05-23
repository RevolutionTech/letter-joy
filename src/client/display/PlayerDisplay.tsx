import { PlayerViewPlayerState } from "../../game/types";
import { Card } from "../cards/Card";
import { DisplayRow, DisplayStatus, HandOfCards } from "./DisplayRow";
import { PlayerHints } from "./PlayerHints";

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
    <DisplayRow>
      <DisplayStatus>
        <div>{playerName}</div>
        <PlayerHints
          playerID={playerID}
          playerName={playerName}
          hintsUsed={hintsUsed}
          teamHintsAvailable={teamHintsAvailable}
        />
      </DisplayStatus>
      <HandOfCards>
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
      </HandOfCards>
    </DisplayRow>
  );
};
