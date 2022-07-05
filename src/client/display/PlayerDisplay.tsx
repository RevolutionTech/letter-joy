import PersonIcon from "@mui/icons-material/Person";

import { Letter, CardStack, PlayerViewPlayerState } from "../../game/types";
import { PresentedCard } from "../cards/PresentedCard";
import {
  DisplayCell,
  DisplayStatus,
  DisplayName,
  HandOfCards,
} from "./DisplayCell";
import { PlayerHints } from "./PlayerHints";

interface Props extends PlayerViewPlayerState {
  playerName: string;
  numPlayers: number;
  teamHintsAvailable: number;
  containsTokens?: number[];
  onAddToSpelling?: () => void;
}

export const PlayerDisplay = (props: Props) => {
  const {
    playerID,
    letters,
    activeLetter,
    hintsUsed,
    playerOutcome,
    playerName,
    numPlayers,
    teamHintsAvailable,
    containsTokens,
    onAddToSpelling,
  } = props;
  const displayLetters =
    playerOutcome?.spelledWord == null
      ? letters
      : (Array.from(playerOutcome.spelledWord) as Letter[]);
  return displayLetters.length > 0 ? (
    <DisplayCell>
      <DisplayStatus>
        <PersonIcon style={{ marginRight: "4px" }} />
        <DisplayName>{playerName}</DisplayName>
        <PlayerHints
          playerID={playerID}
          playerName={playerName}
          numPlayers={numPlayers}
          hintsUsed={hintsUsed}
          teamHintsAvailable={teamHintsAvailable}
        />
      </DisplayStatus>
      <HandOfCards>
        {displayLetters.map((letter, i) => {
          const active =
            playerOutcome != null ||
            (activeLetter.stack === CardStack.ARRAY &&
              i === activeLetter.letterIndex);
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
    </DisplayCell>
  ) : null;
};
