import { styled } from "@material-ui/core";

export const DisplayCell = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "8px",
  marginLeft: "16px",
  marginRight: "16px",
  marginBottom: "16px",
  fontSize: "20pt",
});

export const DisplayStatus = styled("div")({
  display: "flex",
  alignItems: "baseline",
});

export const DisplayName = styled("div")({ marginRight: "16px" });

export const HandOfCards = styled("div")({
  display: "flex",
  marginTop: "16px",
  justifyContent: "flex-start",
  alignItems: "center",
});
