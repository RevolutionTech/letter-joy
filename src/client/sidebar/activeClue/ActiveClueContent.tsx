import { Clue, PlayerViewG } from "../../../game/types";
import { ClueDisplay } from "../../cards/ClueDisplay";
import { SidebarContent } from "../SidebarContent";
import { WaitingContent } from "../WaitingContent";
import { AdvanceDecisionContent } from "./AdvanceDecisionContent";

interface Props {
  g: PlayerViewG;
  currentPlayer: string | null;
  activeClue: Clue;
  playersDecidingToAdvance: string[];
  onAdvanceLetter: () => void;
  onConfirmActiveLetter: () => void;
}

export const ActiveClueContent = (props: Props) => {
  const {
    g,
    currentPlayer,
    activeClue,
    playersDecidingToAdvance,
    onAdvanceLetter,
    onConfirmActiveLetter,
  } = props;
  return (
    <SidebarContent header="Active clue" buttons={[]}>
      <div style={{ fontSize: "48pt" }}>
        <ClueDisplay g={g} tokenPlacement={activeClue.placement} />
      </div>
      {currentPlayer != null &&
      playersDecidingToAdvance.includes(currentPlayer) ? (
        <AdvanceDecisionContent
          activeLetterIndex={g.players[+currentPlayer].activeLetterIndex}
          onAdvanceLetter={onAdvanceLetter}
          onConfirmActiveLetter={onConfirmActiveLetter}
        />
      ) : (
        <WaitingContent
          g={g}
          description="Waiting for other players to decide which letter to use in the next round:"
          playersActing={playersDecidingToAdvance}
        />
      )}
    </SidebarContent>
  );
};
