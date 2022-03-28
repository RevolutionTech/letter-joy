import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Lobby } from "boardgame.io/react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import { LetterJoyBoard } from "./Board";
import { LetterJoy } from "../game/game";
import { Home } from "./lobby/Home";
import { NotFound } from "./lobby/NotFound";

const theme = createTheme();

const { protocol, hostname, port } = window.location;
const SERVER_HOST = `${protocol}//${hostname}:${port}`;

const App = () => (
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="lobby"
            element={
              <Lobby
                gameServer={SERVER_HOST}
                lobbyServer={SERVER_HOST}
                gameComponents={[{ game: LetterJoy, board: LetterJoyBoard }]}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);

export default App;
