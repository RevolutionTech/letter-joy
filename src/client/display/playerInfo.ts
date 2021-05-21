import { styled } from "@material-ui/core";

import { CARD_HEIGHT, CARD_MARGIN_TOP } from "../cards/Card";

export const PlayerInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  minHeight: `calc(${CARD_HEIGHT}px + ${CARD_MARGIN_TOP}px)`,
  marginLeft: "32px",
  fontSize: "28pt",
});

export const PlayerStatus = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "248px",
  marginRight: "32px",
});
