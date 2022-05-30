import { styled } from "@mui/material";

import { OwnerType, CardOwner, Spelling, PlayerViewG } from "../../game/types";
import { getCardLocationsAssignedToOwner } from "../cards/spelling";
import { NonPlayerDisplay } from "./NonPlayerDisplay";
import { PlayerDisplay } from "./PlayerDisplay";
import {
  getOrderedPlayers,
  MaybePlayerNames,
  playerNameDisplay,
} from "./players";
import { TeamDisplay } from "./TeamDisplay";

const HandDisplayGrid = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
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

  const orderedPlayers = getOrderedPlayers(g, currentPlayer);
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
        numPlayers={Object.keys(g.players).length}
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
