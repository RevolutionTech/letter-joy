import { styled, Tooltip } from "@mui/material";

import CardQuantity from "../assets/cardQuantity.svg";
import { Card } from "./Card";
import { Paper } from "./Paper";

const Pile = styled("div")({ position: "relative" });
const CardOnPile = styled(Card)({ position: "absolute", left: 0, top: 0 });
const CardInPile = styled(Paper)({ position: "absolute" });
const CardQuantityBox = styled("div")({
  position: "absolute",
  right: 0,
  top: -9,
  display: "inline-block",
});
const CardQuantityNumber = styled("div")({
  position: "absolute",
  margin: "auto",
  left: 0,
  right: 0,
  top: "15%",
  textAlign: "center",
  fontSize: "16pt",
});

interface Props {
  numCards: number;
}

export const CardPile = (props: Props) => {
  const { numCards } = props;
  return (
    <Pile>
      <CardInPile style={{ left: 8, top: 8 }} />
      <CardInPile style={{ left: 4, top: 4 }} />
      <Pile>
        <CardOnPile letter={null} />
      </Pile>
      <Tooltip
        title={`There are ${numCards} cards in this pile.`}
        PopperProps={{ disablePortal: true }}
      >
        <CardQuantityBox>
          <CardQuantity />
          <CardQuantityNumber>{numCards}</CardQuantityNumber>
        </CardQuantityBox>
      </Tooltip>
    </Pile>
  );
};
