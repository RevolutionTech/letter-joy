import { displayWord } from "../../../../game/word";
import { Button } from "../../../panels/Button";

interface Props {
  spelledWord: string;
  onConfirmUnexpectedWord: (isWord: boolean) => void;
}

export const ConfirmUnexpectedWordContent = (props: Props) => {
  const { spelledWord, onConfirmUnexpectedWord } = props;
  return (
    <div>
      <div style={{ fontSize: "16pt" }}>
        Actually&#8230; it turns out you spelled:
      </div>
      <div style={{ fontSize: "48pt" }}>{displayWord(spelledWord)}</div>
      <div style={{ fontSize: "16pt" }}>Is this a word?</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "8px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => onConfirmUnexpectedWord(true)}
        >
          Yes, it is!
        </Button>
        <Button
          variant="outlined"
          onClick={() => onConfirmUnexpectedWord(false)}
        >
          Nah, I messed up.
        </Button>
      </div>
    </div>
  );
};
