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

  return (
    <Paper
      isClickable={isClickable}
      style={{
        backgroundColor: letter === Letter.WILD ? theme.grey : theme.white,
      }}
    >
      {letter == null ? (
        <img src={cardBack} alt="Letter Joy" style={{ marginTop: "16px" }} />
      ) : (
        <img src={LETTER_SVG[letter]} alt={letter} />
      )}
    </Paper>
  );
};
