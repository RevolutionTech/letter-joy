import { styled } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { Button } from "./Button";
import theme from "./theme";

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

const SidebarHeaderText = styled("div")({ flexGrow: 1, fontSize: "18pt" });
const SidebarNonIdealText = styled("p")({
  fontSize: "16pt",
  fontWeight: "lighter",
});

export const ActionSidebar = () => (
  <Sidebar>
    <div style={{ display: "flex" }}>
      <SidebarHeaderText>Proposed clues</SidebarHeaderText>
      <Button variant="contained" color="primary" startIcon={<AddIcon />}>
        Propose
      </Button>
    </div>
    <SidebarNonIdealText>No clues proposed yet.</SidebarNonIdealText>
  </Sidebar>
);
