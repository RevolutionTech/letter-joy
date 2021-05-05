import { styled } from "@material-ui/core";

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
  clueProposing: string | null;
  onStartProposing: () => void;
  onConfirmProposing?: () => void;
  onCancelProposing: () => void;
}

export const ActionSidebar = (props: Props) => {
  const {
    clueProposing,
    onStartProposing,
    onConfirmProposing,
    onCancelProposing,
  } = props;
  return (
    <Sidebar>
      {clueProposing == null ? (
        <VotingContent onStartProposing={onStartProposing} />
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
