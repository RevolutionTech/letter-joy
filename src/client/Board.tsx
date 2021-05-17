import { useMemo, useState, useCallback } from "react";
import _ from "lodash";
import { BoardProps } from "boardgame.io/react";

import { PlayerViewG } from "../game/types";
import { ActionSidebar } from "./sidebar/ActionSidebar";
import { useClueTokenPlacement } from "./cards/clueTokenPlacement";
import { ActiveTableDisplay } from "./display/ActiveTableDisplay";

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

  return (
    <>
      <ActiveTableDisplay
        g={g}
        clueTokenPlacement={
          g.activeClue == null
            ? proposedClueTokenPlacement
            : g.activeClue.placement
        }
        onAddToClue={isProposing ? addProposedClueToken : undefined}
      />
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
