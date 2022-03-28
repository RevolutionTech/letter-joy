import { styled } from "@mui/material";
import React from "react";

import theme from "../theme";

const LobbyBack = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  [theme.mediaLg]: {
    backgroundColor: theme.silver,
  },
});
const LobbyMenu = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "50%",
  height: "calc(100% - 2 * 40px)",
  padding: "40px",
  backgroundColor: theme.white,
});

// TODO: Add optional nav link back to home page
export const LobbyPage = ({ children }: { children?: React.ReactNode }) => (
  <LobbyBack>
    <LobbyMenu>{children}</LobbyMenu>
  </LobbyBack>
);
