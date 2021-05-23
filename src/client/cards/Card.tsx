import { styled, makeStyles } from "@material-ui/core";

import { Letter } from "../../game/types";
import cardBack from "../assets/cardBack.svg";
import theme from "../theme";
import { LETTER_SVG } from "./letters";
import { Token } from "./Token";

export const CARD_WIDTH = 136;
export const CARD_HEIGHT = 240;
export const CARD_MARGIN_TOP = 48;
const TOKEN_WIDTH = 64;
const TOKEN_SLOT_WIDTH = TOKEN_WIDTH * 6;

const CardWrapper = styled("div")({
  position: "relative",
  width: `${CARD_WIDTH}px`,
  height: `${CARD_HEIGHT}px`,
  marginTop: `${CARD_MARGIN_TOP}px`,
  marginRight: "16px",
});

const Paper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "240px",

  borderStyle: "solid",
  borderWidth: "4px",
  borderRadius: "10px",
});

const TokenWrapper = styled("div")({
  position: "absolute",
  bottom: "calc(-64px - 4px)",
  zIndex: 10,
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
  active?: boolean;
  backgroundColor?: string;
  containsTokens?: number[];
  onClick?: () => void;
}

export const Card = (props: Props) => {
  const classes = useStyles();
  const { letter, active, backgroundColor, containsTokens, onClick } = props;
  const numTokensContained = containsTokens?.length ?? 0;
  const spaceForToken = TOKEN_SLOT_WIDTH / (numTokensContained + 1);

  return (
    <CardWrapper onClick={onClick} style={{ top: active ? "-16px" : "0" }}>
      <Paper
        className={onClick && classes.clickable}
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
      {containsTokens?.map((tokenValue, i) => {
        const offset = spaceForToken * (i + 1);
        return (
          <TokenWrapper
            key={i}
            style={{
              left: `calc(${TOKEN_SLOT_WIDTH / 2}px * -1 + 4px + ${offset}px)`,
            }}
          >
            <Token value={tokenValue} />
          </TokenWrapper>
        );
      })}
    </CardWrapper>
  );
};
