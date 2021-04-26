import { styled } from "@material-ui/core";

import theme from "./theme";
import { Letter, LETTER_SVG } from "./letters";

const Paper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "136px",
  height: "240px",
  margin: "40px",

  backgroundColor: theme.white,
  borderStyle: "solid",
  borderWidth: "4px",
  borderRadius: "10px",
});

interface Props {
  letter: Letter;
}

export const Card = (props: Props) => {
  const { letter } = props;
  return (
    <Paper>
      <img src={LETTER_SVG[letter]} alt={letter} />
    </Paper>
  );
};
