import { useMemo, useState, useCallback } from "react";
import { BoardProps } from "boardgame.io/react";
import { styled } from "@material-ui/core";

import { PlayerViewG } from "../game/types";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_PADDING,
  ActionSidebar,
} from "./sidebar/ActionSidebar";
import {
  getTokensAssignedToOwner,
  getClueDisplay,
  useClueTokenPlacement,
} from "./cards/clueTokenPlacement";
import { PlayerDisplay } from "./display/PlayerDisplay";
import { TeamDisplay } from "./display/TeamDisplay";
import theme from "./theme";

const GameTable = styled("div")({
  display: "flex",
  backgroundColor: theme.silver,
});

const PlayerRows = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "48px",
});

// The SidebarPlaceholder allows the horizontal scrollbar to appear
// when the sidebar is covering some of the main content
const SidebarPlaceholder = styled("div")({
  minWidth: `calc(${SIDEBAR_WIDTH} + ${SIDEBAR_PADDING} * 2)`,
});

export const LetterJoyBoard = (props: BoardProps) => {
  const g: PlayerViewG = props.G;

  const [isProposing, setIsProposing] = useState(false);
  const [
    clueTokenPlacement,
    addClueToken,
    clearClueTokenPlacement,
  ] = useClueTokenPlacement(g);
  const clueDisplay = useMemo(() => getClueDisplay(g, clueTokenPlacement), [
    g,
    clueTokenPlacement,
  ]);
  const onClose = useCallback(() => {
    setIsProposing(false);
    clearClueTokenPlacement();
  }, [clearClueTokenPlacement]);
  const onConfirmProposing = useCallback(() => {
    props.moves.proposeClue(clueTokenPlacement);
    onClose();
  }, [props.moves, onClose, clueTokenPlacement]);

  const playerDisplays = Object.values(g.players).map((playerState, i) => {
    return (
      <PlayerDisplay
        key={playerState.playerID}
        {...playerState}
        teamHintsAvailable={g.teamHints.available}
        containsTokens={getTokensAssignedToOwner(
          clueTokenPlacement,
          playerState.playerID
        )}
        onAddToClue={
          isProposing ? () => addClueToken(playerState.playerID) : undefined
        }
      />
    );
  });

  return (
    <>
      <GameTable>
        <PlayerRows>
          {playerDisplays}
          <TeamDisplay
            teamHints={g.teamHints}
            containsTokens={getTokensAssignedToOwner(
              clueTokenPlacement,
              "TEAM"
            )}
            onAddToClue={isProposing ? () => addClueToken("TEAM") : undefined}
          />
        </PlayerRows>
        <SidebarPlaceholder />
      </GameTable>
      <ActionSidebar
        g={g}
        currentPlayer={props.ctx.currentPlayer}
        clueProposing={isProposing ? clueDisplay : null}
        onStartProposing={() => setIsProposing(true)}
        onConfirmProposing={
          clueTokenPlacement.length > 0 ? onConfirmProposing : undefined
        }
        onCancelProposing={onClose}
        proposedClues={g.proposedClues}
        onChangeVote={props.moves.supportClue}
      />
    </>
  );
};
