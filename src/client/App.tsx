import { Lobby } from "boardgame.io/react";

import { LetterJoyBoard } from "./Board";
import { LetterJoy } from "../game/game";

const { protocol, hostname, port } = window.location;
const SERVER_HOST = `${protocol}//${hostname}:${port}`;

const App = () => (
  <Lobby
    gameServer={SERVER_HOST}
    lobbyServer={SERVER_HOST}
    gameComponents={[{ game: LetterJoy, board: LetterJoyBoard }]}
  />
);

export default App;
