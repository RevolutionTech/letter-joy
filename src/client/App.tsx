import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";

import { LetterJoyBoard } from "./Board";
import { MAX_NUM_PLAYERS } from "../game/constants";
import { LetterJoy } from "../game/game";

const LetterJoyClient = Client({
  game: LetterJoy,
  numPlayers: MAX_NUM_PLAYERS,
  board: LetterJoyBoard,
  multiplayer: Local(),
});

const App = () => <LetterJoyClient playerID="0" />;

export default App;
