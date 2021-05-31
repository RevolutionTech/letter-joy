import { styled } from "@material-ui/core";

import theme from "../theme";

const BOTTOMBAR_HEIGHT = "176px";
export const BOTTOMBAR_PADDING = "32px";

const BottombarContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: `calc(100% - ${BOTTOMBAR_PADDING} * 2)`,
  height: "100%",
});

const BottombarButtons = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  "& .MuiButton-root:not(:last-child)": {
    marginBottom: "32px",
  },
});

const FixedBottombar = styled("div")({
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  height: BOTTOMBAR_HEIGHT,
  padding: BOTTOMBAR_PADDING,
  zIndex: 10000, // higher z-index than draggables

  backgroundColor: theme.white,
});

// The BottombarPlaceholder allows the scrollbar to appear
// when the bottombar is covering some of the main content
export const BottombarPlaceholder = styled("div")({
  minHeight: `calc(${BOTTOMBAR_HEIGHT} + ${BOTTOMBAR_PADDING} * 2)`,
});

interface Props {
  buttons: React.ReactElement[];
}

export const Bottombar = (props: React.PropsWithChildren<Props>) => (
  <FixedBottombar>
    <BottombarContent>
      {props.children}
      <BottombarButtons>{props.buttons}</BottombarButtons>
    </BottombarContent>
  </FixedBottombar>
);
