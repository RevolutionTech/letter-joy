import { Letter, OwnerType } from "../../game/types";
import cardBack from "../assets/cardBack.svg";
import theme from "../theme";
import { LETTER_SVG } from "./letters";
import { Paper, Props as PaperProps } from "./Paper";

type Props = PaperProps & {
  letter: Letter | null;
  destinedOwner: OwnerType;
};

export const Card = (props: Props) => {
  const { letter, destinedOwner, isClickable } = props;
  const Text = letter == null ? cardBack : LETTER_SVG[letter];

  return (
    <Paper
      isClickable={isClickable}
      style={{
        backgroundColor:
          destinedOwner === OwnerType.TEAM ? theme.grey : theme.white,
      }}
    >
      <Text
        style={{
          color: destinedOwner === OwnerType.TEAM ? theme.white : theme.black,
          marginTop: letter == null ? "16px" : null,
        }}
      />
    </Paper>
  );
};
