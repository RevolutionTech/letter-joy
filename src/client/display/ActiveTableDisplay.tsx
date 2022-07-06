import { styled } from "@mui/material";

import {
  OwnerType,
  CardLocation,
  Spelling,
  PlayerViewG,
  CardStack,
} from "../../game/types";
import { getTokensAtLocation } from "../cards/spelling";
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
  onAddToSpelling?: (cardLocation: CardLocation) => void;
}

export const ActiveTableDisplay = (props: Props) => {
  const { g, playerNames, currentPlayer, spelling, onAddToSpelling } = props;

  const nonPlayerDisplays = g.nonPlayers.map((nonPlayerLetters, i) => {
    const owner: {
      ownerType: OwnerType.NONPLAYER;
      nonPlayerIndex: number;
    } = {
      ownerType: OwnerType.NONPLAYER,
      nonPlayerIndex: i,
    };
    const cardLocation = { owner, stack: CardStack.ARRAY, letterIndex: 0 };
    return (
      <NonPlayerDisplay
        key={i}
        letters={nonPlayerLetters}
        nonPlayerIndex={i}
        containsTokens={spelling && getTokensAtLocation(spelling, cardLocation)}
        onAddToSpelling={
          onAddToSpelling && (() => onAddToSpelling(cardLocation))
        }
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
    const cardLocation = { owner, ...playerState.activeLetter };
    return (
      <PlayerDisplay
        key={playerID}
        {...playerState}
        playerName={playerNameDisplay(playerNames, +playerID)}
        numPlayers={Object.keys(g.players).length}
        teamHintsAvailable={g.team.hints.available}
        containsTokens={spelling && getTokensAtLocation(spelling, cardLocation)}
        onAddToSpelling={
          onAddToSpelling && (() => onAddToSpelling(cardLocation))
        }
      />
    );
  });

  return (
    <HandDisplayGrid>
      <TeamDisplay
        team={g.team}
        spelling={spelling}
        onAddToSpelling={onAddToSpelling}
      />
      {nonPlayerDisplays}
      {playerDisplays}
    </HandDisplayGrid>
  );
};
