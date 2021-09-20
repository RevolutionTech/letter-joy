import { Server, Origins } from "boardgame.io/server";
import { LetterJoy } from "./game/game";

const server = Server({
  games: [LetterJoy],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
