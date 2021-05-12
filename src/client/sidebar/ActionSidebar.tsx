import { styled } from "@material-ui/core";

import { PlayerViewG } from "../../game/types";
import theme from "../theme";
import { ActiveClueContent } from "./activeClue/ActiveClueContent";
import { ChoosingClueContent } from "./chooseClue/ChoosingClueContent";

export const SIDEBAR_WIDTH = "400px";
export const SIDEBAR_PADDING = "24px";

const Sidebar = styled("div")({
  position: "fixed",
  top: "0",
  right: "0",
  width: SIDEBAR_WIDTH,
  height: "100%",
  padding: SIDEBAR_PADDING,

  backgroundColor: theme.white,
});

interface Props {
  g: PlayerViewG;
  currentPlayer: string | null;
  clueProposing: string | null;
  onStartProposing: () => void;
  onConfirmProposing?: () => void;
  onCancelProposing: () => void;
  onChangeVote: (clueIndex: number | null) => void;
  playersDecidingToAdvance: string[];
  onAdvanceLetter: () => void;
  onConfirmActiveLetter: () => void;
}

export const ActionSidebar = (props: Props) => {
  const {
    g,
    currentPlayer,
    clueProposing,
    onStartProposing,
    onConfirmProposing,
    onCancelProposing,
    onChangeVote,
    playersDecidingToAdvance,
    onAdvanceLetter,
    onConfirmActiveLetter,
  } = props;
  const { activeClue } = g;

  return (
    <Sidebar>
      {activeClue == null ? (
        <ChoosingClueContent
          g={g}
          currentPlayer={currentPlayer}
          clueProposing={clueProposing}
          onStartProposing={onStartProposing}
          onConfirmProposing={onConfirmProposing}
          onCancelProposing={onCancelProposing}
          onChangeVote={onChangeVote}
        />
      ) : (
        <ActiveClueContent
          g={g}
          currentPlayer={currentPlayer}
          activeClue={activeClue}
          playersDecidingToAdvance={playersDecidingToAdvance}
          onAdvanceLetter={onAdvanceLetter}
          onConfirmActiveLetter={onConfirmActiveLetter}
        />
      )}
    </Sidebar>
  );
};
