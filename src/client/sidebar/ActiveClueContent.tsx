import { Clue, PlayerViewG } from "../../game/types";
import { getClueDisplay } from "../cards/clueTokenPlacement";
import { AdvanceDecisionContent } from "./AdvanceDecisionContent";
import { SidebarContent } from "./SidebarContent";
import { WaitingContent } from "./WaitingContent";

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
        {getClueDisplay(g, activeClue.placement)}
      </div>
      {currentPlayer != null &&
      playersDecidingToAdvance.includes(currentPlayer) ? (
        <AdvanceDecisionContent
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
