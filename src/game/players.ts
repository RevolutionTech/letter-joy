import _ from "lodash";
import { Ctx } from "boardgame.io";

import { modulo } from "./utils";

export const getLeftPlayerID = (numPlayers: number, playerID: number) =>
  modulo(playerID - 1, numPlayers);

export const getRightPlayerID = (numPlayers: number, playerID: number) =>
  modulo(playerID + 1, numPlayers);

export const getPlayersActing = (ctx: Ctx) =>
  Object.keys(
    _.pickBy(
      ctx.activePlayers,
      (stage) => !["waiting", "scoring"].includes(stage)
    )
  );

export const isEveryPlayerWaiting = (ctx: Ctx) =>
  ctx.activePlayers != null && getPlayersActing(ctx).length === 0;
