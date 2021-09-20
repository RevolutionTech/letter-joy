import { Server } from "boardgame.io/server";
import { LetterJoy } from "./game/game";

const server = Server({ games: [LetterJoy] });

server.run(8000);
