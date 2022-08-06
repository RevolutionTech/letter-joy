import { Letter } from "../../game/types";
import cardBack from "../assets/cardBack.svg";
import theme from "../theme";
import { LETTER_SVG } from "./letters";
import { Paper, Props as PaperProps } from "./Paper";

type Props = PaperProps & {
  letter: Letter | null;
};

export const Card = (props: Props) => {
  const { letter, isClickable } = props;
  const Text = letter == null ? cardBack : LETTER_SVG[letter];

  return (
    <Paper
      isClickable={isClickable}
      style={{
        backgroundColor: letter === Letter.WILD ? theme.grey : theme.white,
      }}
    >
      <Text style={{ marginTop: letter == null ? "16px" : null }} />
    </Paper>
  );
};
