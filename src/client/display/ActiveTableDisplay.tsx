import { styled } from "@mui/material";

import { LETTERS_PER_PLAYER } from "../../game/constants";
import { getRightPlayerID } from "../../game/players";
import { Spelling, PlayerViewG } from "../../game/types";
import { cycleArray } from "../../game/utils";
import {
  CARD_WIDTH,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../cards/Card";
import { getCardLocationsAssignedToOwner } from "../cards/spelling";
import { PlayerDisplay } from "./PlayerDisplay";
import { MaybePlayerNames, playerNameDisplay } from "./playerName";
import { TeamDisplay } from "./TeamDisplay";

const PlayerDisplayGrid = styled("div")({
  display: "grid",
  width: "100%",
  height: "fit-content",
  gridTemplateColumns: `repeat(auto-fill, calc(${LETTERS_PER_PLAYER} * (${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2 + ${CARD_MARGIN_RIGHT}px)))`,
  gridColumnGap: "16px",
});
interface Props {
  g: PlayerViewG;
  playerNames: MaybePlayerNames;
  currentPlayer: string | null;
  spelling?: Spelling;
  onAddToSpelling?: (ownerID: string) => void;
}

export const ActiveTableDisplay = (props: Props) => {
  const { g, playerNames, currentPlayer, spelling, onAddToSpelling } = props;

  const rightPlayerID =
    currentPlayer == null ? 0 : getRightPlayerID(+currentPlayer);
  const orderedPlayers = cycleArray(Object.values(g.players), rightPlayerID);
  const playerDisplays = orderedPlayers.map((playerState) => {
    const playerID = playerState.playerID;
    return (
      <PlayerDisplay
        key={playerID}
        {...playerState}
        playerName={playerNameDisplay(playerNames, +playerID)}
        teamHintsAvailable={g.teamHints.available}
        containsTokens={
          spelling && getCardLocationsAssignedToOwner(spelling, playerID)
        }
        onAddToSpelling={onAddToSpelling && (() => onAddToSpelling(playerID))}
      />
    );
  });

  return (
    <PlayerDisplayGrid>
      <TeamDisplay
        teamLetters={g.teamLetters}
        teamHints={g.teamHints}
        containsTokens={
          spelling && getCardLocationsAssignedToOwner(spelling, "TEAM")
        }
        onAddToSpelling={onAddToSpelling && (() => onAddToSpelling("TEAM"))}
      />
      {playerDisplays}
    </PlayerDisplayGrid>
  );
};
