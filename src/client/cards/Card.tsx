import { styled } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

import { Letter } from "../../game/types";
import cardBack from "../assets/cardBack.svg";
import theme from "../theme";
import { LETTER_SVG } from "./letters";

export const CARD_WIDTH = 68;
export const CARD_HEIGHT = 120;
export const CARD_BORDER_WIDTH = 2;
export const CARD_MARGIN_RIGHT = 8;

const Paper = styled("div")({
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
});

const useStyles = makeStyles({
  clickable: {
    "&:hover": {
      borderStyle: "double",
    },
  },
});

interface Props {
  letter: Letter | null;
  isClickable?: boolean;
}

export const Card = (props: Props) => {
  const classes = useStyles();
  const { letter, isClickable } = props;

  return (
    <Paper
      className={isClickable ? classes.clickable : undefined}
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
