import { useMemo, useState, useCallback } from "react";
import _ from "lodash";
import {
  styled,
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab,
  Box,
} from "@mui/material";

import theme from "../theme";
import { Letter } from "../../game/types";
import { getOrdinalSuffix } from "../../game/utils";

const LetterNotesFooter = styled("div")({
  padding: "24px",
  backgroundColor: theme.white,
});
const LetterNotesTabs = styled(Box)({
  display: "flex",
  borderBottom: 1,
  borderColor: "divider",
});
const Header = styled("div")({ fontSize: "18pt", marginRight: "8px" });
const LetterTab = styled(Tab)({ paddingTop: 0 });
const LetterButtons = styled(ToggleButtonGroup)({
  display: "flex",
  marginTop: "4px",
  overflowX: "auto",
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
    isCandidate: boolean,
    disableRemaining?: boolean
  ) => void;
}

export const LetterNotes = (props: Props) => {
  const [letterIndex, setLetterIndex] = useState(0);
  const activeNotes = useMemo(
    () => props.notes[letterIndex],
    [props.notes, letterIndex]
  );
  const onUpdateNote = useCallback(
    (e: React.MouseEvent<HTMLElement>, char: Letter) => {
      const isDoubleClick = e.detail == 2;
      props.onUpdateNote(
        letterIndex,
        char,
        isDoubleClick || !activeNotes[char],
        isDoubleClick
      );
    },
    [props.onUpdateNote, letterIndex, activeNotes]
  );

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
      <LetterButtons onChange={onUpdateNote}>
        {ALPHABET.map((char) => {
          const isCandidate: boolean | undefined = (
            activeNotes as Record<string, boolean>
          )[char];
          return (
            <LetterButton
              key={`${letterIndex}-${char}`}
              value={char}
              disabled={isCandidate == null}
              selected={isCandidate}
            >
              {char}
            </LetterButton>
          );
        })}
      </LetterButtons>
    </LetterNotesFooter>
  ) : null;
};
