import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import { Home } from "./lobby/Home";
import { CreateRoom } from "./lobby/CreateRoom";
import { LobbyPage } from "./lobby/LobbyPage";
import { NotFound } from "./lobby/NotFound";
import { HelpContent } from "./lobby/help/HelpContent";
import { Room } from "./lobby/room/Room";

const theme = createTheme();

const App = () => (
  <CookiesProvider>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/help"
              element={
                <LobbyPage>
                  <HelpContent />
                </LobbyPage>
              }
            />
            <Route path="room/new" element={<CreateRoom />} />
            <Route path="room/:matchID" element={<Room />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </CookiesProvider>
);

export default App;
