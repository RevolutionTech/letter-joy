import { styled } from "@material-ui/core";

import { CARD_HEIGHT } from "../cards/Card";
import { PRESENTED_CARD_MARGIN_TOP } from "../cards/PresentedCard";

export const DisplayRow = styled("div")({
  display: "flex",
  alignItems: "center",
  minHeight: `calc(${CARD_HEIGHT}px + ${PRESENTED_CARD_MARGIN_TOP}px)`,
  marginLeft: "16px",
  marginRight: "16px",
  fontSize: "20pt",
});

export const DisplayStatus = styled("div")({
  display: "flex",
  flexDirection: "column",
  minWidth: "184px",
  maxWidth: "184px",
  marginRight: "16px",
});

export const HandOfCards = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});
