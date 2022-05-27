import { styled } from "@mui/material";

export const DisplayCell = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "8px 16px",
  fontSize: "20pt",
});

export const DisplayStatus = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const DisplayName = styled("div")({ marginRight: "16px" });

export const HandOfCards = styled("div")({
  display: "flex",
  margin: "16px 0",
  justifyContent: "flex-start",
  alignItems: "center",
});
