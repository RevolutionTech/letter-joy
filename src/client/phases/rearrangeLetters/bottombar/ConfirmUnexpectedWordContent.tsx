import { displayWord } from "../../../../game/word";
import { Bottombar } from "../../../panels/Bottombar";
import { Button } from "../../../panels/Button";

interface Props {
  spelledWord: string;
  onConfirmUnexpectedWord: (isWord: boolean) => void;
}

export const ConfirmUnexpectedWordContent = (props: Props) => {
  const { spelledWord, onConfirmUnexpectedWord } = props;
  return (
    <Bottombar
      buttons={[
        <Button
          key="yes"
          variant="outlined"
          size="large"
          onClick={() => onConfirmUnexpectedWord(true)}
        >
          Yes, it is!
        </Button>,
        <Button
          key="no"
          variant="outlined"
          size="large"
          onClick={() => onConfirmUnexpectedWord(false)}
        >
          Nah, I messed up.
        </Button>,
      ]}
    >
      <div>
        <div style={{ fontSize: "24pt" }}>
          Actually&#8230; it turns out you spelled:
        </div>
        <div style={{ fontSize: "36pt" }}>{displayWord(spelledWord)}</div>
        <div style={{ fontSize: "24pt" }}>Is this a word?</div>
      </div>
    </Bottombar>
  );
};
