import _ from "lodash";

import { MAX_NUM_STARS, totalStars } from "../../../game/scoring";
import starFilled from "../../assets/starFilled.svg";
import starUnfilled from "../../assets/starUnfilled.svg";

interface Props {
  score: number;
  numPlayers: number;
}

export const StarRating = (props: Props) => {
  const numStars = totalStars(props.score, props.numPlayers);
  const numStarsText = `${numStars}/${MAX_NUM_STARS} stars`;

  return (
    <>
      {_.range(numStars).map((i) => (
        <img key={i} src={starFilled} alt={numStarsText} />
      ))}
      {_.range(MAX_NUM_STARS - numStars).map((i) => (
        <img key={i} src={starUnfilled} alt={numStarsText} />
      ))}
    </>
  );
};
