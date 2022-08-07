import { useMemo, useState, useCallback, useEffect } from "react";
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
import { Letter, CardStack, OwnerCardLocation } from "../../game/types";
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
  activeLetter: OwnerCardLocation;
  notes: Record<Letter, boolean>[];
  onUpdateNote: (
    letterIndex: number,
    letter: Letter,
    isCandidate: boolean
  ) => void;
}

export const LetterNotes = (props: Props) => {
  const [letterIndex, setLetterIndex] = useState(0);
  const activeNotes = useMemo(
    () => props.notes[letterIndex],
    [props.notes, letterIndex]
  );
  const getLetterTabLabel = useCallback(
    (i: number) => {
      const notes = props.notes[i];
      const candidates = _.keys(_.pickBy(notes, (value) => value));
      let candidatesLabel = "";
      if (candidates.length > 3) {
        const [firstCandidate, secondCandidate] = candidates;
        candidatesLabel = ` (${firstCandidate}, ${secondCandidate}, ...)`;
      } else if (candidates.length > 0) {
        candidatesLabel = ` (${candidates.join(", ")})`;
      }

      return `${getOrdinalSuffix(i + 1)} Letter${candidatesLabel}`;
    },
    [props.notes]
  );
  const onUpdateNote = useCallback(
    (e: React.MouseEvent<HTMLElement>, char: Letter) => {
      props.onUpdateNote(letterIndex, char, !activeNotes[char]);
    },
    [props.onUpdateNote, letterIndex, activeNotes]
  );

  // Update tab when the player's letter index changes
  const activeLetterIndex =
    props.activeLetter.stack === CardStack.ARRAY
      ? props.activeLetter.letterIndex
      : props.notes.length - 1;
  useEffect(() => {
    setLetterIndex(activeLetterIndex);
  }, [activeLetterIndex, setLetterIndex]);

  return (
    <LetterNotesFooter>
      <LetterNotesTabs>
        <Header>Notes</Header>
        <Tabs
          value={letterIndex}
          onChange={(_, newTab) => setLetterIndex(newTab)}
        >
          {props.notes.map((_, i) => (
            <LetterTab key={i} label={getLetterTabLabel(i)} />
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
  );
};
