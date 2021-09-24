import _ from "lodash";
import { Ctx } from "boardgame.io";

import { MAX_NUM_PLAYERS } from "./constants";
import { modulo } from "./utils";

export const getLeftPlayerID = (playerID: number) =>
  modulo(playerID - 1, MAX_NUM_PLAYERS);

export const getPlayersActing = (ctx: Ctx) =>
  Object.keys(_.pickBy(ctx.activePlayers, (stage) => stage !== "waiting"));
