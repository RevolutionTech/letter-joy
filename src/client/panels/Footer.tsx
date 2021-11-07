import { styled } from "@mui/material";

import theme from "../theme";

const FOOTER_PADDING = "32px";

const FooterContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: `calc(100% - ${FOOTER_PADDING} * 2)`,
});

const FooterButtons = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  "& .MuiButton-root:not(:last-child)": {
    marginBottom: "32px",
  },
});

const FixedFooter = styled("div")({
  width: "100%",
  height: "176px",
  padding: FOOTER_PADDING,
  zIndex: 10000, // higher z-index than draggables

  backgroundColor: theme.white,
});

interface Props {
  buttons: React.ReactElement[];
}

export const Footer = (props: React.PropsWithChildren<Props>) => (
  <FixedFooter>
    <FooterContent>
      {props.children}
      <FooterButtons>{props.buttons}</FooterButtons>
    </FooterContent>
  </FixedFooter>
);
