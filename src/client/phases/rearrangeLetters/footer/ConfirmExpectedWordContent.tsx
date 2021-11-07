import { useState } from "react";
import _ from "lodash";
import { styled, TextField } from "@mui/material";

import { Button } from "../../../panels/Button";
import { Footer } from "../../../panels/Footer";

const StyledTextField = styled(TextField)({
  width: "100%",
  marginTop: "16px",

  "& input.MuiInputBase-input": { padding: "16px" },
});

interface Props {
  numSortedCards: number;
  onConfirmExpectedWord: (expectedWord: string) => void;
  onCancelExpectedWord: () => void;
}

export const ConfirmExpectedWordContent = (props: Props) => {
  const { numSortedCards, onConfirmExpectedWord, onCancelExpectedWord } = props;

  const [expectedWord, setExpectedWord] = useState<string>("");

  return (
    <Footer
      buttons={[
        <Button
          key="confirm"
          variant="contained"
          color="primary"
          size="large"
          disabled={expectedWord.length !== numSortedCards}
          onClick={() => onConfirmExpectedWord(expectedWord)}
        >
          Confirm
        </Button>,
        <Button
          key="cancel"
          variant="outlined"
          size="large"
          onClick={() => {
            setExpectedWord("");
            onCancelExpectedWord();
          }}
        >
          Cancel
        </Button>,
      ]}
    >
      <div>
        <div style={{ fontSize: "36pt" }}>
          What do you believe you&apos;ve spelled?
        </div>
        <StyledTextField
          id="expected-word"
          variant="filled"
          value={expectedWord}
          placeholder="Your word here..."
          onChange={(event) => setExpectedWord(_.toUpper(event.target.value))}
        />
      </div>
    </Footer>
  );
};
