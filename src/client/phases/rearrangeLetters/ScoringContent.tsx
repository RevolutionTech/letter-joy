import { ActivePlayers } from "boardgame.io";
import _ from "lodash";
import { styled } from "@material-ui/core";

import { playerScore, totalScore } from "../../../game/scoring";
import { PlayerViewG } from "../../../game/types";
import { displayWord } from "../../../game/word";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { Sidebar } from "../../panels/sidebar/Sidebar";

const Body = styled("p")({ fontSize: "16pt" });
const EmphasisBody = styled("span")({ fontSize: "24pt" });

interface Props {
  g: PlayerViewG;
  activePlayers: ActivePlayers;
}

export const ScoringContent = (props: Props) => {
  const { g, activePlayers } = props;
  const teamHintsAvailable = g.teamHints.available;
  const finishedPlayers = Object.values(g.players).filter(
    (player) => player.playerOutcome
  );
  return (
    <>
      <ActiveTableDisplay g={g} />
      <Sidebar g={g}>
        {_.sortBy(finishedPlayers, (player) => player.playerID).map(
          (player) => (
            <Body key={player.playerID}>
              <EmphasisBody>{player.playerName}</EmphasisBody> scored{" "}
              {playerScore(player.playerOutcome!, teamHintsAvailable)} points
              with{" "}
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
            <EmphasisBody>{g.players[+playerID].playerName}</EmphasisBody> is
            rearranging letters to make a word.
          </Body>
        ))}
        <h5>Total Score</h5>
        <p>
          <EmphasisBody>
            {totalScore(
              finishedPlayers.map((player) => player.playerOutcome!),
              teamHintsAvailable
            )}{" "}
            points
          </EmphasisBody>
        </p>
        {/* TODO: Add star rating */}
      </Sidebar>
    </>
  );
};
