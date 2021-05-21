import { styled } from "@material-ui/core";

import theme from "../../theme";

const BOTTOMBAR_HEIGHT = "176px";
export const BOTTOMBAR_PADDING = "32px";

export const Bottombar = styled("div")({
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  height: BOTTOMBAR_HEIGHT,
  padding: BOTTOMBAR_PADDING,

  backgroundColor: theme.white,
});

// The BottombarPlaceholder allows the scrollbar to appear
// when the bottombar is covering some of the main content
export const BottombarPlaceholder = styled("div")({
  minHeight: `calc(${BOTTOMBAR_HEIGHT} + ${BOTTOMBAR_PADDING} * 2)`,
});
