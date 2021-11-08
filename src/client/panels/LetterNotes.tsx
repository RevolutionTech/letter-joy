import { useState } from "react";
import _ from "lodash";
import { styled, ToggleButton, Tabs, Tab, Box } from "@mui/material";

import { Letter } from "../../game/types";
import { getOrdinalSuffix } from "../../game/utils";

const LetterNotesFooter = styled("div")({ padding: "24px" });
const LetterNotesTabs = styled(Box)({
  display: "flex",
  borderBottom: 1,
  borderColor: "divider",
});
const Header = styled("div")({ fontSize: "18pt", marginRight: "8px" });
const LetterTab = styled(Tab)({ paddingTop: 0 });
const LetterButtons = styled("div")({
  display: "flex",
  gap: "4px",
  marginTop: "4px",
  overflowX: "scroll",
});
const LetterButton = styled(ToggleButton)({ flexGrow: 1 });

const ALPHABET = _.range("A".charCodeAt(0), "Z".charCodeAt(0) + 1).map(
  (charCode) => String.fromCharCode(charCode)
);

interface Props {
  notes: Record<Letter, boolean>[];
  onUpdateNote: (
    letterIndex: number,
    letter: Letter,
    isCandidate: boolean
  ) => void;
}

export const LetterNotes = (props: Props) => {
  const [letterIndex, setLetterIndex] = useState(0);

  return props.notes.length > 0 ? (
    <LetterNotesFooter>
      <LetterNotesTabs>
        <Header>Notes</Header>
        <Tabs
          value={letterIndex}
          onChange={(_, newTab) => setLetterIndex(newTab)}
        >
          {props.notes.map((_, i) => (
            <LetterTab key={i} label={`${getOrdinalSuffix(i + 1)} Letter`} />
          ))}
        </Tabs>
      </LetterNotesTabs>
      <LetterButtons>
        {ALPHABET.map((char) => {
          const isCandidate: boolean | undefined = (
            props.notes[letterIndex] as Record<string, boolean>
          )[char];
          return (
            <LetterButton
              key={`${letterIndex}-${char}`}
              value={char}
              disabled={isCandidate == null}
              selected={isCandidate}
              onChange={() =>
                props.onUpdateNote(letterIndex, char as Letter, !isCandidate)
              }
            >
              {char}
            </LetterButton>
          );
        })}
      </LetterButtons>
    </LetterNotesFooter>
  ) : null;
};
