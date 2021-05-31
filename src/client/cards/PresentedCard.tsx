import { styled } from "@material-ui/core";

import { Letter } from "../../game/types";
import { Card } from "./Card";
import { Token } from "./Token";

export const PRESENTED_CARD_MARGIN_TOP = 48;
const TOKEN_WIDTH = 64;
const TOKEN_SLOT_WIDTH = TOKEN_WIDTH * 6;

const CardWrapper = styled("div")({
  position: "relative",
  marginTop: `${PRESENTED_CARD_MARGIN_TOP}px`,
});

const TokenWrapper = styled("div")({
  position: "absolute",
  bottom: "calc(-64px - 4px)",
  zIndex: 10,
});

interface Props {
  letter: Letter | null;
  active?: boolean;
  backgroundColor?: string;
  containsTokens?: number[];
  onClick?: () => void;
}

export const PresentedCard = (props: Props) => {
  const { letter, active, backgroundColor, containsTokens, onClick } = props;
  const numTokensContained = containsTokens?.length ?? 0;
  const spaceForToken = TOKEN_SLOT_WIDTH / (numTokensContained + 1);

  return (
    <CardWrapper onClick={onClick} style={{ top: active ? "-16px" : "0" }}>
      <Card
        letter={letter}
        backgroundColor={backgroundColor}
        isClickable={onClick != null}
      />
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
