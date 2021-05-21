import { useMemo } from "react";
import { BoardProps } from "boardgame.io/react";

import { getPlayersActing } from "../../../game/phases";
import { PlayerViewG } from "../../../game/types";
import { ClueDisplay } from "../../cards/ClueDisplay";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { Sidebar } from "../../sidebar/Sidebar";
import { SidebarContent } from "../../sidebar/SidebarContent";
import { WaitingContent } from "../../sidebar/WaitingContent";
import { AdvanceDecisionContent } from "./AdvanceDecisionContent";

export const ActiveClueBoard = (props: BoardProps) => {
  const g: PlayerViewG = props.G;
  const currentPlayer = props.playerID;

  const playersActing = useMemo(() => getPlayersActing(props.ctx), [props.ctx]);

  // Assert that there must be an active clue when in this phase
  if (g.activeClue == null) {
    return null;
  }

  return (
    <>
      <ActiveTableDisplay g={g} clueTokenPlacement={g.activeClue.placement} />
      <Sidebar g={g}>
        <SidebarContent header="Active clue" buttons={[]}>
          <div style={{ fontSize: "48pt" }}>
            <ClueDisplay g={g} tokenPlacement={g.activeClue.placement} />
          </div>
          {currentPlayer != null && playersActing.includes(currentPlayer) ? (
            <AdvanceDecisionContent
              activeLetterIndex={g.players[+currentPlayer].activeLetterIndex}
              onAdvanceLetter={props.moves.advanceLetter}
              onConfirmActiveLetter={() => props.events.endStage?.()}
            />
          ) : (
            <WaitingContent
              g={g}
              description="Waiting for other players to decide which letter to use in the next round:"
              playersActing={playersActing}
            />
          )}
        </SidebarContent>
      </Sidebar>
    </>
  );
};