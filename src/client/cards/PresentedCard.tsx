import { styled } from "@mui/material";

import { Letter, OwnerType } from "../../game/types";
import { Card } from "./Card";
import { Token } from "./Token";

const TOKEN_WIDTH = 32;
const TOKEN_SLOT_WIDTH = TOKEN_WIDTH * 6;

const CardWrapper = styled("div")({
  position: "relative",
  marginTop: "8px",
});

const TokenWrapper = styled("div")({
  position: "absolute",
  bottom: "calc(-32px - 4px)",
  zIndex: 10,
});

interface Props {
  letter: Letter | null;
  destinedOwner: OwnerType;
  active?: boolean;
  containsTokens?: number[];
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const PresentedCard = (props: Props) => {
  const { letter, destinedOwner, active, containsTokens, onClick, style } =
    props;
  const numTokensContained = containsTokens?.length ?? 0;
  const spaceForToken = TOKEN_SLOT_WIDTH / (numTokensContained + 1);

  return (
    <CardWrapper
      onClick={onClick}
      style={{ ...style, top: active ? "-8px" : "0" }}
    >
      <Card
        letter={letter}
        destinedOwner={destinedOwner}
        isClickable={onClick != null}
      />
      {containsTokens?.map((tokenValue, i) => {
        const offset = spaceForToken * (i + 1);
        return (
          <TokenWrapper
            key={i}
            style={{
              left: `calc(${TOKEN_SLOT_WIDTH / 2}px * -1 + 2px + ${offset}px)`,
            }}
          >
            <Token value={tokenValue} />
          </TokenWrapper>
        );
      })}
    </CardWrapper>
  );
};
