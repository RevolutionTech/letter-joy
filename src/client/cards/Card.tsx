import isPropValid from "@emotion/is-prop-valid";
import { styled } from "@mui/material";

import { Letter } from "../../game/types";
import cardBack from "../assets/cardBack.svg";
import theme from "../theme";
import { LETTER_SVG } from "./letters";

export const CARD_WIDTH = 68;
export const CARD_HEIGHT = 120;
export const CARD_BORDER_WIDTH = 3;
export const CARD_MARGIN_RIGHT = 8;

interface PaperProps {
  isClickable?: boolean;
}

const Paper = styled("div", { shouldForwardProp: isPropValid })<PaperProps>(
  ({ isClickable }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    marginRight: `${CARD_MARGIN_RIGHT}px`,

    borderStyle: "solid",
    borderWidth: `${CARD_BORDER_WIDTH}px`,
    borderRadius: "6px",
    userSelect: "none",

    "&:hover": {
      borderStyle: isClickable ? "double" : "solid",
    },
  })
);

type Props = PaperProps & {
  letter: Letter | null;
};

export const Card = (props: Props) => {
  const { letter, isClickable } = props;

  return (
    <Paper
      isClickable={isClickable}
      style={{
        backgroundColor: letter === Letter.WILD ? theme.grey : theme.white,
      }}
    >
      {letter == null ? (
        <img src={cardBack} alt="Letter Joy" style={{ marginTop: "16px" }} />
      ) : (
        <img src={LETTER_SVG[letter]} alt={letter} />
      )}
    </Paper>
  );
};
