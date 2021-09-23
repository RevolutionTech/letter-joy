import { Lobby } from "boardgame.io/react";

import { LetterJoyBoard } from "./Board";
import { LetterJoy } from "../game/game";

const SERVER_HOST = "http://localhost:8000";

const App = () => (
  <Lobby
    gameServer={SERVER_HOST}
    lobbyServer={SERVER_HOST}
    gameComponents={[{ game: LetterJoy, board: LetterJoyBoard }]}
  />
);

export default App;
