import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";

import { LetterJoyBoard } from "./Board";
import { MAX_NUM_PLAYERS } from "../game/constants";
import { LetterJoy } from "../game/game";

const SERVER_HOST = "localhost";

const LetterJoyClient = Client({
  game: LetterJoy,
  numPlayers: MAX_NUM_PLAYERS,
  board: LetterJoyBoard,
  multiplayer: SocketIO({ server: `${SERVER_HOST}:8000` }),
});

const App = () => <LetterJoyClient playerID="0" />;

export default App;
