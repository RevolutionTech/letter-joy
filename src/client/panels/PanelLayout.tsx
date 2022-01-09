import { styled } from "@mui/material";

import theme from "../theme";

const TopPanels = styled("div")({
  display: "flex",
  flex: "1 1 0",
  overflowY: "auto",
});

const GameTable = styled("div")({
  display: "flex",
  flex: "1 1 0",
  overflow: "auto",
  backgroundColor: theme.silver,
  padding: "16px",
});

interface Props {
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
}

export const PanelLayout = (props: React.PropsWithChildren<Props>) => (
  <>
    <TopPanels>
      <GameTable>{props.children}</GameTable>
      {props.sidebar}
    </TopPanels>
    {props.footer}
  </>
);
