import _ from "lodash";
import { styled } from "@material-ui/core";

import { MAX_NUM_STARS, totalStars } from "../../../game/scoring";
import starFilled from "../../assets/starFilled.svg";
import starUnfilled from "../../assets/starUnfilled.svg";

const RatingContainer = styled("div")({ marginBottom: "16px" });

interface Props {
  score: number;
}

export const StarRating = (props: Props) => {
  const numStars = totalStars(props.score);
  const numStarsText = `${numStars}/${MAX_NUM_STARS} stars`;

  return (
    <RatingContainer>
      {_.range(numStars).map((_) => (
        <img src={starFilled} alt={numStarsText} />
      ))}
      {_.range(MAX_NUM_STARS - numStars).map((_) => (
        <img src={starUnfilled} alt={numStarsText} />
      ))}
    </RatingContainer>
  );
};
