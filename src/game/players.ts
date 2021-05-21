import { MAX_NUM_PLAYERS } from "./constants";
import { modulo } from "./utils";

export const getLeftPlayerID = (playerID: number) =>
  modulo(playerID - 1, MAX_NUM_PLAYERS);
