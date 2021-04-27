import { styled } from "@material-ui/core";

import cardBack from "./assets/cardBack.svg";
import theme from "./theme";
import { Letter, LETTER_SVG } from "./letters";

const Paper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "136px",
  height: "240px",
  marginRight: "16px",

  borderStyle: "solid",
  borderWidth: "4px",
  borderRadius: "10px",
});

interface Props {
  letter: Letter;
  visible: boolean;
  backgroundColor?: string;
}

export const Card = (props: Props) => {
  const { letter, visible, backgroundColor } = props;
  return (
    <Paper
      style={{
        backgroundColor: backgroundColor ?? theme.white,
      }}
    >
      {visible ? (
        <img src={LETTER_SVG[letter]} alt={letter} />
      ) : (
        <img src={cardBack} alt="Letter Joy" style={{ marginTop: "32px" }} />
      )}
    </Paper>
  );
};
