import { styled } from "@material-ui/core";

import theme from "../theme";

export const GameTable = styled("div")({
  display: "flex",
  backgroundColor: theme.silver,
  paddingBottom: "12px",
});

export const FullWidthGameTable = styled(GameTable)({
  flexDirection: "column",
  minWidth: "fit-content",
  minHeight: "fit-content",
  height: "100vh",
});
