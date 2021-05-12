import { styled } from "@material-ui/core";

import { Button } from "../Button";

const AdvanceDecisionButton = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const AdvanceDecisionButtonHelpText = styled("div")({
  marginTop: "8px",
  marginBottom: "8px",
});

interface Props {
  onAdvanceLetter: () => void;
  onConfirmActiveLetter: () => void;
}

export const AdvanceDecisionContent = (props: Props) => {
  const { onAdvanceLetter, onConfirmActiveLetter } = props;
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <AdvanceDecisionButton>
        {/* TODO: Write the letter position here (ie. my 1st letter) */}
        <AdvanceDecisionButtonHelpText>
          I know my current letter!
        </AdvanceDecisionButtonHelpText>
        <Button
          variant="outlined"
          onClick={() => {
            onAdvanceLetter();
            onConfirmActiveLetter();
          }}
        >
          Next Letter
        </Button>
      </AdvanceDecisionButton>
      <AdvanceDecisionButton>
        <AdvanceDecisionButtonHelpText>
          I need another clue&#8230;
        </AdvanceDecisionButtonHelpText>
        <Button variant="outlined" onClick={onConfirmActiveLetter}>
          Keep Letter
        </Button>
      </AdvanceDecisionButton>
    </div>
  );
};
