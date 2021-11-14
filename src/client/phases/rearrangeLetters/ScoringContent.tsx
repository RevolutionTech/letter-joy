import { ActivePlayers } from "boardgame.io";
import _ from "lodash";
import { styled } from "@mui/material";

import { playerScore, totalScore } from "../../../game/scoring";
import { Letter, PlayerViewG } from "../../../game/types";
import { displayWord } from "../../../game/word";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { MaybePlayerNames, playerNameDisplay } from "../../display/playerName";
import { LetterNotes } from "../../panels/LetterNotes";
import { PanelLayout } from "../../panels/PanelLayout";
import { Sidebar } from "../../panels/sidebar/Sidebar";
import { StarRating } from "./StarRating";

const Body = styled("p")({ fontSize: "16pt" });
const EmphasisBody = styled("span")({ fontSize: "24pt", whiteSpace: "nowrap" });

interface Props {
  g: PlayerViewG;
  playerNames: MaybePlayerNames;
  currentPlayer: string | null;
  activePlayers: ActivePlayers;
  onUpdateNote: (
    letterIndex: number,
    letter: Letter,
    isCandidate: boolean
  ) => void;
}

export const ScoringContent = (props: Props) => {
  const { g, playerNames, currentPlayer, activePlayers, onUpdateNote } = props;
  const teamHintsAvailable = g.teamHints.available;
  const playerStates = Object.values(g.players);
  const finishedPlayers = playerStates.filter((player) => player.playerOutcome);
  const teamScore = totalScore(
    finishedPlayers.map((player) => player.playerOutcome!),
    teamHintsAvailable
  );

  return (
    <PanelLayout
      sidebar={
        <Sidebar g={g}>
          {_.sortBy(finishedPlayers, (player) => player.playerID).map(
            (player) => (
              <Body key={player.playerID}>
                <EmphasisBody>
                  {playerNameDisplay(playerNames, +player.playerID)}
                </EmphasisBody>{" "}
                scored {playerScore(player.playerOutcome!, teamHintsAvailable)}{" "}
                points with{" "}
                <EmphasisBody>
                  {displayWord(player.playerOutcome!.spelledWord)}
                </EmphasisBody>
                .
              </Body>
            )
          )}
          {Object.keys(
            _.pickBy(activePlayers, (stage) => stage === "rearrangeLettersMain")
          ).map((playerID) => (
            <Body key={playerID}>
              <EmphasisBody>
                {playerNameDisplay(playerNames, +playerID)}
              </EmphasisBody>{" "}
              is rearranging letters to make a word.
            </Body>
          ))}
          <h5>Total Score</h5>
          <p>
            <EmphasisBody>{teamScore} points</EmphasisBody>
          </p>
          <StarRating score={teamScore} numPlayers={playerStates.length} />
        </Sidebar>
      }
      footer={<LetterNotes notes={g.letterNotes} onUpdateNote={onUpdateNote} />}
    >
      <ActiveTableDisplay
        g={g}
        playerNames={playerNames}
        currentPlayer={currentPlayer}
      />
    </PanelLayout>
  );
};
