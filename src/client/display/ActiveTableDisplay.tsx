import { styled } from "@material-ui/core";

import { LETTERS_PER_PLAYER } from "../../game/constants";
import { Spelling, PlayerViewG } from "../../game/types";
import {
  CARD_WIDTH,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../cards/Card";
import { getCardLocationsAssignedToOwner } from "../cards/spelling";
import { PlayerDisplay } from "./PlayerDisplay";
import { MaybePlayerNames, playerNameDisplay } from "./playerName";
import { TeamDisplay } from "./TeamDisplay";

const PlayerRows = styled("div")({
  display: "grid",
  width: "100%",
  height: "fit-content",
  gridTemplateColumns: `repeat(auto-fill, calc(${LETTERS_PER_PLAYER} * (${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2 + ${CARD_MARGIN_RIGHT}px)))`,
  gridColumnGap: "16px",
});
interface Props {
  g: PlayerViewG;
  playerNames: MaybePlayerNames;
  spelling?: Spelling;
  onAddToSpelling?: (ownerID: string) => void;
}

export const ActiveTableDisplay = (props: Props) => {
  const { g, playerNames, spelling, onAddToSpelling } = props;

  const playerDisplays = Object.values(g.players).map((playerState) => {
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
    <PlayerRows>
      {playerDisplays}
      <TeamDisplay
        teamLetters={g.teamLetters}
        teamHints={g.teamHints}
        containsTokens={
          spelling && getCardLocationsAssignedToOwner(spelling, "TEAM")
        }
        onAddToSpelling={onAddToSpelling && (() => onAddToSpelling("TEAM"))}
      />
    </PlayerRows>
  );
};
