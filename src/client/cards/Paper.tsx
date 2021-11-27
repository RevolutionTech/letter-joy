import isPropValid from "@emotion/is-prop-valid";
import { styled } from "@mui/material";

import theme from "../theme";

export const CARD_WIDTH = 68;
export const CARD_HEIGHT = 120;
export const CARD_BORDER_WIDTH = 3;
export const CARD_MARGIN_RIGHT = 8;

export interface Props {
  isClickable?: boolean;
}

export const Paper = styled("div", { shouldForwardProp: isPropValid })<Props>(
  ({ isClickable }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    marginRight: `${CARD_MARGIN_RIGHT}px`,

    backgroundColor: theme.white,
    borderStyle: "solid",
    borderWidth: `${CARD_BORDER_WIDTH}px`,
    borderRadius: "6px",
    userSelect: "none",

    "&:hover": {
      borderStyle: isClickable ? "double" : "solid",
    },
  })
);
