import { styled } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { Button } from "./Button";
import { SidebarContent } from "./SidebarContent";

const SidebarNonIdealText = styled("p")({
  fontSize: "16pt",
  fontWeight: "lighter",
});

interface Props {
  onStartProposing: () => void;
}

export const VotingContent = (props: Props) => {
  const { onStartProposing } = props;
  return (
    <SidebarContent
      header="Proposed clues"
      buttons={[
        <Button
          key="propose"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onStartProposing}
        >
          Propose
        </Button>,
      ]}
    >
      <SidebarNonIdealText>No clues proposed yet.</SidebarNonIdealText>
    </SidebarContent>
  );
};
