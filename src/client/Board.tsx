import { useMemo, useState, useCallback } from "react";
import _ from "lodash";
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
    proposedClueTokenPlacement,
    addProposedClueToken,
    clearProposedClueTokenPlacement,
  ] = useClueTokenPlacement(g);
  const onCloseProposing = useCallback(() => {
    setIsProposing(false);
    clearProposedClueTokenPlacement();
  }, [clearProposedClueTokenPlacement]);
  const onConfirmProposing = useCallback(() => {
    props.moves.proposeClue(proposedClueTokenPlacement);
    onCloseProposing();
  }, [props.moves, onCloseProposing, proposedClueTokenPlacement]);

  const playersDecidingToAdvance = useMemo(
    () =>
      Object.keys(
        _.pickBy(props.ctx.activePlayers, (phase) => phase === "deciding")
      ),
    [props.ctx.activePlayers]
  );

  const playerDisplays = Object.values(g.players).map((playerState) => {
    return (
      <PlayerDisplay
        key={playerState.playerID}
        {...playerState}
        teamHintsAvailable={g.teamHints.available}
        containsTokens={getTokensAssignedToOwner(
          g.activeClue == null
            ? proposedClueTokenPlacement
            : g.activeClue.placement,
          playerState.playerID
        )}
        onAddToClue={
          isProposing
            ? () => addProposedClueToken(playerState.playerID)
            : undefined
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
              g.activeClue == null
                ? proposedClueTokenPlacement
                : g.activeClue.placement,
              "TEAM"
            )}
            onAddToClue={
              isProposing ? () => addProposedClueToken("TEAM") : undefined
            }
          />
        </PlayerRows>
        <SidebarPlaceholder />
      </GameTable>
      <ActionSidebar
        g={g}
        currentPlayer={props.playerID}
        clueProposingPlacement={isProposing ? proposedClueTokenPlacement : null}
        onStartProposing={() => setIsProposing(true)}
        onConfirmProposing={
          proposedClueTokenPlacement.length > 0 ? onConfirmProposing : undefined
        }
        onCancelProposing={onCloseProposing}
        onChangeVote={props.moves.supportClue}
        playersDecidingToAdvance={playersDecidingToAdvance}
        onAdvanceLetter={props.moves.advanceLetter}
        onConfirmActiveLetter={() => props.events.endStage?.()}
      />
    </>
  );
};
