import { styled } from "@material-ui/core";

import { Button } from "./Button";
import { SidebarContent } from "./SidebarContent";

const SidebarClueText = styled("div")({ fontSize: "48pt" });

interface Props {
  clueProposing: string;
  onConfirmProposing?: () => void;
  onCancelProposing: () => void;
}

export const ProposingContent = (props: Props) => {
  const { clueProposing, onConfirmProposing, onCancelProposing } = props;
  return (
    <SidebarContent
      header="Proposing clue"
      buttons={[
        <Button
          key="confirm"
          variant="contained"
          color="primary"
          disabled={onConfirmProposing == null}
        >
          Confirm
        </Button>,
        <Button
          key="cancel"
          variant="outlined"
          style={{ marginTop: "8px" }}
          onClick={onCancelProposing}
        >
          Cancel
        </Button>,
      ]}
    >
      <SidebarClueText>{clueProposing}</SidebarClueText>
    </SidebarContent>
  );
};
