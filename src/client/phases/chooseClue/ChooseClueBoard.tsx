import { useState, useCallback } from "react";
import { BoardProps } from "boardgame.io/react";

import { PlayerViewG } from "../../../game/types";
import { useClueTokenPlacement } from "../../cards/clueTokenPlacement";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { Sidebar } from "../../panels/sidebar/Sidebar";
import { ProposingContent } from "./sidebar/ProposingContent";
import { VotingContent } from "./sidebar/VotingContent";

export const ChooseClueBoard = (props: BoardProps) => {
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

  return (
    <>
      <ActiveTableDisplay
        g={g}
        clueTokenPlacement={proposedClueTokenPlacement}
        onAddToClue={isProposing ? addProposedClueToken : undefined}
      />
      <Sidebar g={g}>
        {isProposing ? (
          <ProposingContent
            g={g}
            clueProposingPlacement={proposedClueTokenPlacement}
            onConfirmProposing={
              proposedClueTokenPlacement.length > 0
                ? onConfirmProposing
                : undefined
            }
            onCancelProposing={onCloseProposing}
          />
        ) : (
          <VotingContent
            g={g}
            currentPlayer={props.playerID}
            onStartProposing={() => setIsProposing(true)}
            onChangeVote={props.moves.supportClue}
          />
        )}
      </Sidebar>
    </>
  );
};
