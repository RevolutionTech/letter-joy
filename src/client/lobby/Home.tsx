import { styled } from "@mui/material";

import Title from "../assets/lobby/title.svg";
import { LobbyPage } from "./LobbyPage";
import { MenuButton } from "./MenuButton";

const StyledTitle = styled(Title)({
  maxWidth: "136px",
  marginTop: "20px",
});
const Tagline = styled("p")({ margin: "44px 0" });

export const Home = () => (
  <LobbyPage showLogo={false}>
    <StyledTitle />
    <Tagline>A cooperative word deduction game.</Tagline>
    <MenuButton to="/room/new" variant="contained" color="primary">
      New game
    </MenuButton>
    <MenuButton to="/help" variant="outlined">
      How to play
    </MenuButton>
    <MenuButton to="/credits" variant="outlined">
      Credits
    </MenuButton>
  </LobbyPage>
);
