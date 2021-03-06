import { useMemo } from "react";
import { BoardProps } from "boardgame.io/react";

import { getPlayersActing } from "../../../game/players";
import { PlayerViewG } from "../../../game/types";
import { ClueDisplay } from "../../cards/ClueDisplay";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { PanelLayout } from "../../panels/PanelLayout";
import { Sidebar } from "../../panels/sidebar/Sidebar";
import { SidebarContent } from "../../panels/sidebar/SidebarContent";
import { WaitingContent } from "../../panels/sidebar/WaitingContent";
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
    <PanelLayout
      sidebar={
        <Sidebar g={g}>
          <SidebarContent header="Active clue" buttons={[]}>
            <div style={{ fontSize: "48pt" }}>
              <ClueDisplay g={g} spelling={g.activeClue.spelling} />
            </div>
            {currentPlayer != null && playersActing.includes(currentPlayer) ? (
              <AdvanceDecisionContent
                activeLetter={g.players[+currentPlayer].activeLetter}
                onAdvanceLetter={props.moves.advanceLetter}
                onConfirmActiveLetter={() => props.events.endStage?.()}
              />
            ) : (
              <WaitingContent
                playerNames={props.matchData}
                description="Waiting for other players to decide which letter to use in the next round:"
                playersActing={playersActing}
              />
            )}
          </SidebarContent>
        </Sidebar>
      }
    >
      <ActiveTableDisplay
        g={g}
        playerNames={props.matchData}
        currentPlayer={currentPlayer}
        spelling={g.activeClue.spelling}
      />
    </PanelLayout>
  );
};
