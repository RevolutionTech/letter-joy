import { styled, makeStyles } from "@material-ui/core";

import { Letter } from "../../game/types";
import cardBack from "../assets/cardBack.svg";
import theme from "../theme";
import { LETTER_SVG } from "./letters";

export const CARD_WIDTH = 136;
export const CARD_HEIGHT = 240;

const Paper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: `${CARD_WIDTH}px`,
  height: `${CARD_HEIGHT}px`,
  marginRight: "16px",

  borderStyle: "solid",
  borderWidth: "4px",
  borderRadius: "10px",
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
  backgroundColor?: string;
  isClickable?: boolean;
}

export const Card = (props: Props) => {
  const classes = useStyles();
  const { letter, backgroundColor, isClickable } = props;

  return (
    <Paper
      className={isClickable ? classes.clickable : undefined}
      style={{
        backgroundColor: backgroundColor ?? theme.white,
      }}
    >
      {letter == null ? (
        <img src={cardBack} alt="Letter Joy" style={{ marginTop: "32px" }} />
      ) : (
        <img src={LETTER_SVG[letter]} alt={letter} />
      )}
    </Paper>
  );
};
