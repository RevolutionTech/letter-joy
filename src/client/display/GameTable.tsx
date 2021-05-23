import { styled } from "@material-ui/core";

import theme from "../theme";

export const GameTable = styled("div")({
  display: "flex",
  backgroundColor: theme.silver,
});

export const FullWidthGameTable = styled(GameTable)({
  flexDirection: "column",
  width: "100%",
  height: "100vh",
});
