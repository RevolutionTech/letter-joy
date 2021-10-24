import { styled } from "@material-ui/core";

import theme from "../theme";

const PanelWrapper = styled("div")({
  position: "fixed",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const PanelContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const TopPanels = styled("div")({
  display: "flex",
  flex: "1 1 0",
  overflowY: "scroll",
});

const GameTable = styled("div")({
  display: "flex",
  flex: "1 1 0",
  overflow: "scroll",
  backgroundColor: theme.silver,
  padding: "16px",
});

interface Props {
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
}

export const PanelLayout = (props: React.PropsWithChildren<Props>) => (
  <PanelWrapper>
    <PanelContainer>
      <TopPanels>
        <GameTable>{props.children}</GameTable>
        {props.sidebar}
      </TopPanels>
      {props.footer}
    </PanelContainer>
  </PanelWrapper>
);
