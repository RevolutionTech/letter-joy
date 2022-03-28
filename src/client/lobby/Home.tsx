import { styled } from "@mui/material";

import title from "../assets/lobby/title.svg";
import { LobbyPage } from "./LobbyPage";
import { MenuButton } from "./MenuButton";

const Title = styled("img")({
  maxWidth: "136px",
});
const Tagline = styled("p")({ margin: "44px 0" });

export const Home = () => (
  <LobbyPage>
    <Title src={title} alt="Letter Joy" />
    <Tagline>A cooperative word deduction game.</Tagline>
    <MenuButton to="/lobby" variant="contained" color="primary">
      Play game
    </MenuButton>
  </LobbyPage>
);
