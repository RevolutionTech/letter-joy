import { Client } from "boardgame.io/react";

import { LetterJoyBoard } from "./Board";
import { LetterJoy } from "../game/game";

const App = Client({ game: LetterJoy, board: LetterJoyBoard });

export default App;
