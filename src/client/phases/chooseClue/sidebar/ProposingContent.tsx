import { styled } from "@material-ui/core";

import { ClueTokenPlacement, PlayerViewG } from "../../../../game/types";
import { ClueDisplay } from "../../../cards/ClueDisplay";
import { Button } from "../../../sidebar/Button";
import { SidebarContent } from "../../../sidebar/SidebarContent";

const SidebarClueText = styled("div")({ fontSize: "48pt" });

interface Props {
  g: PlayerViewG;
  clueProposingPlacement: ClueTokenPlacement;
  onConfirmProposing?: () => void;
  onCancelProposing: () => void;
}

export const ProposingContent = (props: Props) => {
  const {
    g,
    clueProposingPlacement,
    onConfirmProposing,
    onCancelProposing,
  } = props;
  return (
    <SidebarContent
      header="Proposing clue"
      buttons={[
        <Button
          key="confirm"
          variant="contained"
          color="primary"
          disabled={onConfirmProposing == null}
          onClick={onConfirmProposing}
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
      <SidebarClueText>
        <ClueDisplay g={g} tokenPlacement={clueProposingPlacement} />
      </SidebarClueText>
    </SidebarContent>
  );
};
