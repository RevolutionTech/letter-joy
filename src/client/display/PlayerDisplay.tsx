import { PlayerViewPlayerState } from "../../game/types";
import { PresentedCard } from "../cards/PresentedCard";
import { DisplayRow, DisplayStatus, HandOfCards } from "./DisplayRow";
import { PlayerHints } from "./PlayerHints";

interface Props extends PlayerViewPlayerState {
  playerName: string;
  teamHintsAvailable: number;
  containsTokens?: number[];
  onAddToSpelling?: () => void;
}

export const PlayerDisplay = (props: Props) => {
  const {
    playerID,
    letters,
    activeLetterIndex,
    hintsUsed,
    playerName,
    teamHintsAvailable,
    containsTokens,
    onAddToSpelling,
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
            <PresentedCard
              key={`${playerID}-${i}`}
              letter={letterDisplayed}
              active={active}
              containsTokens={active ? containsTokens : undefined}
              onClick={letterDisplayed == null ? undefined : onAddToSpelling}
            />
          );
        })}
      </HandOfCards>
    </DisplayRow>
  );
};
