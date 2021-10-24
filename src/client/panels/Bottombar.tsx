import { styled } from "@material-ui/core";

import theme from "../theme";

const BOTTOMBAR_PADDING = "32px";

const BottombarContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: `calc(100% - ${BOTTOMBAR_PADDING} * 2)`,
});

const BottombarButtons = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  "& .MuiButton-root:not(:last-child)": {
    marginBottom: "32px",
  },
});

const FixedBottombar = styled("div")({
  width: "100%",
  height: "176px",
  padding: BOTTOMBAR_PADDING,
  zIndex: 10000, // higher z-index than draggables

  backgroundColor: theme.white,
});

interface Props {
  buttons: React.ReactElement[];
}

export const Bottombar = (props: React.PropsWithChildren<Props>) => (
  <FixedBottombar>
    <BottombarContent>
      {props.children}
      <BottombarButtons>{props.buttons}</BottombarButtons>
    </BottombarContent>
  </FixedBottombar>
);
