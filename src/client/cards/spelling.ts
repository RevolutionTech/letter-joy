import { useState, useCallback } from "react";
import _ from "lodash";

import { CardLocation, Spelling } from "../../game/types";

export const getTokensAtLocation = (
  spelling: Spelling,
  cardLocation: CardLocation
) =>
  _.range(spelling.length)
    .filter((i) => _.isEqual(spelling[i], cardLocation))
    .map((i) => i + 1);

export const useSpelling = () => {
  const [spelling, setSpelling] = useState<Spelling>([]);

  const addCardLocation = useCallback(
    (cardLocation: CardLocation) =>
      setSpelling((cardLocations) => [...cardLocations, cardLocation]),
    []
  );

  const clearSpelling = useCallback(() => setSpelling([]), []);

  return [spelling, addCardLocation, clearSpelling] as const;
};
