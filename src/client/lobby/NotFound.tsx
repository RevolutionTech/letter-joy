import { styled } from "@mui/material";

import { LobbyPage } from "./LobbyPage";
import { MenuButton } from "./MenuButton";

const StyledP = styled("p")({ marginBottom: "44px" });

export const NotFound = () => (
  <LobbyPage>
    <h1>404 Not Found</h1>
    <StyledP>
      Hmm... we couldn&apos;t figure out what you were trying to spell there.
      Sorry!
    </StyledP>
    <MenuButton to="/" variant="contained" color="primary">
      Return home
    </MenuButton>
  </LobbyPage>
);
