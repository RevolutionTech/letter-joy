import { styled } from "@material-ui/core";

import { PlayerViewG, PlayerViewProposedClue } from "../../game/types";
import theme from "../theme";
import { ProposingContent } from "./ProposingContent";
import { VotingContent } from "./VotingContent";

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
  currentPlayer: string;
  clueProposing: string | null;
  onStartProposing: () => void;
  onConfirmProposing?: () => void;
  onCancelProposing: () => void;
  proposedClues: PlayerViewProposedClue[];
  onChangeVote: (clueIndex: number | null) => void;
}

export const ActionSidebar = (props: Props) => {
  const {
    g,
    currentPlayer,
    clueProposing,
    onStartProposing,
    onConfirmProposing,
    onCancelProposing,
    proposedClues,
    onChangeVote,
  } = props;
  return (
    <Sidebar>
      {clueProposing == null ? (
        <VotingContent
          g={g}
          currentPlayer={currentPlayer}
          onStartProposing={onStartProposing}
          proposedClues={proposedClues}
          onChangeVote={onChangeVote}
        />
      ) : (
        <ProposingContent
          clueProposing={clueProposing}
          onConfirmProposing={onConfirmProposing}
          onCancelProposing={onCancelProposing}
        />
      )}
    </Sidebar>
  );
};
