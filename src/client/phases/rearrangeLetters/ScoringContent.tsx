import { ActivePlayers } from "boardgame.io";
import _ from "lodash";
import { styled } from "@material-ui/core";

import { playerScore, totalScore } from "../../../game/scoring";
import { PlayerViewG } from "../../../game/types";
import { displayWord } from "../../../game/word";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { MaybePlayerNames, playerNameDisplay } from "../../display/playerName";
import { Sidebar } from "../../panels/sidebar/Sidebar";
import { StarRating } from "./StarRating";

const Body = styled("p")({ fontSize: "16pt" });
const EmphasisBody = styled("span")({ fontSize: "24pt", whiteSpace: "nowrap" });

interface Props {
  g: PlayerViewG;
  playerNames: MaybePlayerNames;
  activePlayers: ActivePlayers;
}

export const ScoringContent = (props: Props) => {
  const { g, playerNames, activePlayers } = props;
  const teamHintsAvailable = g.teamHints.available;
  const finishedPlayers = Object.values(g.players).filter(
    (player) => player.playerOutcome
  );
  const teamScore = totalScore(
    finishedPlayers.map((player) => player.playerOutcome!),
    teamHintsAvailable
  );
  return (
    <>
      <ActiveTableDisplay g={g} playerNames={playerNames} />
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
        <StarRating score={teamScore} />
      </Sidebar>
    </>
  );
};
