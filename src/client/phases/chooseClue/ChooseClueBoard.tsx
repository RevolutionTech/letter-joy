import { useState, useCallback } from "react";
import { BoardProps } from "boardgame.io/react";

import { PlayerViewG } from "../../../game/types";
import { useSpelling } from "../../cards/spelling";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { Sidebar } from "../../panels/sidebar/Sidebar";
import { ProposingContent } from "./sidebar/ProposingContent";
import { VotingContent } from "./sidebar/VotingContent";

export const ChooseClueBoard = (props: BoardProps) => {
  const g: PlayerViewG = props.G;

  const [isProposing, setIsProposing] = useState(false);
  const [spelling, addCardLocation, clearSpelling] = useSpelling(g);
  const onCloseProposing = useCallback(() => {
    setIsProposing(false);
    clearSpelling();
  }, [clearSpelling]);
  const onConfirmProposing = useCallback(() => {
    props.moves.proposeClue(spelling);
    onCloseProposing();
  }, [props.moves, onCloseProposing, spelling]);

  return (
    <>
      <ActiveTableDisplay
        g={g}
        spelling={spelling}
        onAddToSpelling={isProposing ? addCardLocation : undefined}
      />
      <Sidebar g={g}>
        {isProposing ? (
          <ProposingContent
            g={g}
            clueProposingPlacement={spelling}
            onConfirmProposing={
              spelling.length > 0 ? onConfirmProposing : undefined
            }
            onCancelProposing={onCloseProposing}
          />
        ) : (
          <VotingContent
            g={g}
            currentPlayer={props.playerID}
            onStartProposing={() => setIsProposing(true)}
            onResetSupport={() => props.moves.resetSupport(true)}
            onSupportClue={props.moves.supportClue}
            onSupportEnd={props.moves.supportEnd}
          />
        )}
      </Sidebar>
    </>
  );
};
