import _ from "lodash";
import { Star, StarBorder } from "@mui/icons-material";

import { MAX_NUM_STARS, totalStars } from "../../../game/scoring";

interface Props {
  score: number;
  numPlayers: number;
}

export const StarRating = (props: Props) => {
  const numStars = totalStars(props.score, props.numPlayers);
  return (
    <>
      {_.range(numStars).map((i) => (
        <Star key={i} />
      ))}
      {_.range(MAX_NUM_STARS - numStars).map((i) => (
        <StarBorder key={i} />
      ))}
    </>
  );
};
