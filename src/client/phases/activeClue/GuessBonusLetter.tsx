import { useState } from "react";
import _ from "lodash";
import { styled } from "@mui/material";

import { isLetter } from "../../../game/letters";
import { Letter } from "../../../game/types";
import { Button, TextField } from "../../panels/MUI";

const AdvanceDecisionButtons = styled("div")({
  display: "flex",
  justifyContent: "space-evenly",
  gap: "16px",
  marginTop: "8px",
  marginBottom: "16px",
});

const StyledButton = styled(Button)({ flexGrow: "1" });

interface Props {
  onAdvanceLetter: (letterGuess?: Letter) => void;
  onConfirmActiveLetter: () => void;
}

export const GuessBonusLetter = (props: Props) => {
  const { onAdvanceLetter, onConfirmActiveLetter } = props;

  const [letterGuess, setLetterGuess] = useState<"" | Letter>("");

  return (
    <div style={{ margin: "32px 0" }}>
      <div style={{ fontSize: "16pt" }}>You may guess your bonus letter.</div>
      <TextField
        id="bonus-letter"
        variant="filled"
        value={letterGuess}
        placeholder="Your guess here..."
        onChange={(event) => {
          const letter = _.toUpper(event.target.value);
          if (letter === "" || isLetter(letter)) {
            return setLetterGuess(letter);
          }
        }}
      />
      <AdvanceDecisionButtons>
        <StyledButton
          key="guess"
          variant="outlined"
          disabled={letterGuess.length !== 1}
          onClick={() => {
            if (isLetter(letterGuess)) {
              onAdvanceLetter(letterGuess);
              onConfirmActiveLetter();
            }
          }}
        >
          Guess Letter
        </StyledButton>
        <StyledButton
          key="keep"
          variant="outlined"
          onClick={onConfirmActiveLetter}
        >
          Keep Letter
        </StyledButton>
      </AdvanceDecisionButtons>
    </div>
  );
};
