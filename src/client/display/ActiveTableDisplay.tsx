import { styled } from "@mui/material";

import { LETTERS_PER_PLAYER } from "../../game/constants";
import { getRightPlayerID } from "../../game/players";
import { OwnerType, CardOwner, Spelling, PlayerViewG } from "../../game/types";
import { cycleArray } from "../../game/utils";
import {
  CARD_WIDTH,
  CARD_BORDER_WIDTH,
  CARD_MARGIN_RIGHT,
} from "../cards/Paper";
import { getCardLocationsAssignedToOwner } from "../cards/spelling";
import { NonPlayerDisplay } from "./NonPlayerDisplay";
import { PlayerDisplay } from "./PlayerDisplay";
import { MaybePlayerNames, playerNameDisplay } from "./playerName";
import { TeamDisplay } from "./TeamDisplay";

const HandDisplayGrid = styled("div")({
  display: "grid",
  width: "100%",
  height: "fit-content",
  gridTemplateColumns: `repeat(auto-fill, calc(${LETTERS_PER_PLAYER} * (${CARD_WIDTH}px + ${CARD_BORDER_WIDTH}px * 2 + ${CARD_MARGIN_RIGHT}px)))`,
  gridColumnGap: "32px",
});
interface Props {
  g: PlayerViewG;
  playerNames: MaybePlayerNames;
  currentPlayer: string | null;
  spelling?: Spelling;
  onAddToSpelling?: (owner: CardOwner) => void;
}

export const ActiveTableDisplay = (props: Props) => {
  const { g, playerNames, currentPlayer, spelling, onAddToSpelling } = props;
  const teamOwner: { ownerType: OwnerType.TEAM } = {
    ownerType: OwnerType.TEAM,
  };

  const nonPlayerDisplays = g.nonPlayers.map((nonPlayerLetters, i) => {
    const owner: {
      ownerType: OwnerType.NONPLAYER;
      nonPlayerIndex: number;
    } = {
      ownerType: OwnerType.NONPLAYER,
      nonPlayerIndex: i,
    };
    return (
      <NonPlayerDisplay
        key={i}
        letters={nonPlayerLetters}
        nonPlayerIndex={i}
        containsTokens={
          spelling && getCardLocationsAssignedToOwner(spelling, owner)
        }
        onAddToSpelling={onAddToSpelling && (() => onAddToSpelling(owner))}
      />
    );
  });

  const playerStates = Object.values(g.players);
  const rightPlayerID =
    currentPlayer == null
      ? 0
      : getRightPlayerID(playerStates.length, +currentPlayer);
  const orderedPlayers = cycleArray(playerStates, rightPlayerID);
  const playerDisplays = orderedPlayers.map((playerState) => {
    const playerID = playerState.playerID;
    const owner: { ownerType: OwnerType.PLAYER; playerID: string } = {
      ownerType: OwnerType.PLAYER,
      playerID,
    };
    return (
      <PlayerDisplay
        key={playerID}
        {...playerState}
        playerName={playerNameDisplay(playerNames, +playerID)}
        numPlayers={playerStates.length}
        teamHintsAvailable={g.teamHints.available}
        containsTokens={
          spelling && getCardLocationsAssignedToOwner(spelling, owner)
        }
        onAddToSpelling={onAddToSpelling && (() => onAddToSpelling(owner))}
      />
    );
  });

  return (
    <HandDisplayGrid>
      <TeamDisplay
        teamLetters={g.teamLetters}
        teamHints={g.teamHints}
        containsTokens={
          spelling && getCardLocationsAssignedToOwner(spelling, teamOwner)
        }
        onAddToSpelling={onAddToSpelling && (() => onAddToSpelling(teamOwner))}
      />
      {nonPlayerDisplays}
      {playerDisplays}
    </HandDisplayGrid>
  );
};
