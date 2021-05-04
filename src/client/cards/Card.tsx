import { styled } from "@material-ui/core";

import { Letter } from "../../game/types";
import cardBack from "../assets/cardBack.svg";
import theme from "../theme";
import { LETTER_SVG } from "./letters";
import { Token } from "./Token";

const TOKEN_WIDTH = 64;
const TOKEN_SLOT_WIDTH = TOKEN_WIDTH * 6;

const CardSlot = styled("div")({
  position: "relative",
  width: "136px",
  height: "240px",
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

interface Props {
  letter: Letter;
  active?: boolean;
  visible: boolean;
  backgroundColor?: string;
  containsTokens?: number[];
}

export const Card = (props: Props) => {
  const { letter, active, visible, backgroundColor, containsTokens } = props;
  const numTokensContained = containsTokens?.length ?? 0;
  const spaceForToken = TOKEN_SLOT_WIDTH / (numTokensContained + 1);

  return (
    <CardSlot style={{ top: active ? "-16px" : "0" }}>
      <Paper
        style={{
          backgroundColor: backgroundColor ?? theme.white,
        }}
      >
        {visible ? (
          <img src={LETTER_SVG[letter]} alt={letter} />
        ) : (
          <img src={cardBack} alt="Letter Joy" style={{ marginTop: "32px" }} />
        )}
      </Paper>
      {containsTokens?.map((tokenValue, i) => {
        const offset = spaceForToken * (i + 1);
        return (
          <TokenWrapper
            style={{
              left: `calc(${TOKEN_SLOT_WIDTH / 2}px * -1 + 4px + ${offset}px)`,
            }}
          >
            <Token value={tokenValue} />
          </TokenWrapper>
        );
      })}
    </CardSlot>
  );
};
