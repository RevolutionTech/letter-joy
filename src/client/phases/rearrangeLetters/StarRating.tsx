import _ from "lodash";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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
        <StarIcon key={i} />
      ))}
      {_.range(MAX_NUM_STARS - numStars).map((i) => (
        <StarBorderIcon key={i} />
      ))}
    </>
  );
};
