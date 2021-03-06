import { styled } from "@mui/material";
import React from "react";

import logo from "../assets/lobby/logo.svg";
import theme from "../theme";

const LobbyBack = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.silver,
});
const LobbyMenu = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "calc(100% - 2 * 20px)",
  padding: "20px",
  [theme.mediaLg]: {
    width: "50%",
    height: "calc(100% - 2 * 40px)",
    padding: "40px",
  },
  backgroundColor: theme.white,
});
const LogoAnchor = styled("a")({
  position: "absolute",
  alignSelf: "flex-start",
});

interface Props {
  showLogo?: boolean;
}

export const LobbyPage = (props: React.PropsWithChildren<Props>) => (
  <LobbyBack>
    <LobbyMenu>
      {(props.showLogo ?? true) && (
        <LogoAnchor href="/">
          <img src={logo} alt="Home" />
        </LogoAnchor>
      )}
      {props.children}
    </LobbyMenu>
  </LobbyBack>
);
