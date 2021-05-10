import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";

import { LetterJoyBoard } from "./Board";
import { LetterJoy } from "../game/game";

const LetterJoyClient = Client({
  game: LetterJoy,
  numPlayers: 6,
  board: LetterJoyBoard,
  multiplayer: Local(),
});

const App = () => <LetterJoyClient playerID="0" />;

export default App;
