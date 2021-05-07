import {
  styled,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { PlayerViewG, PlayerViewProposedClue } from "../../game/types";
import theme from "../theme";
import { Button } from "./Button";
import { ProposedClueRadioButton } from "./ProposedClueRadioButton";
import { SidebarContent } from "./SidebarContent";

const SidebarNonIdealText = styled("p")({
  fontFamily: theme.fontFamily,
  fontSize: "16pt",
  fontWeight: "lighter",
});

interface Props {
  g: PlayerViewG;
  onStartProposing: () => void;
  proposedClues: PlayerViewProposedClue[];
}

export const VotingContent = (props: Props) => {
  const { g, onStartProposing, proposedClues } = props;
  return (
    <SidebarContent
      header="Proposed clues"
      buttons={[
        <Button
          key="propose"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onStartProposing}
        >
          Propose
        </Button>,
      ]}
    >
      <FormControl component="fieldset">
        <RadioGroup aria-label="Vote on proposed clues" name="proposed-clues">
          {proposedClues.map((proposedClue, i) => (
            <ProposedClueRadioButton
              key={i}
              g={g}
              proposedClueId={i}
              proposedClue={proposedClue}
            />
          ))}
          {proposedClues.length === 0 ? (
            <SidebarNonIdealText>No clues proposed yet.</SidebarNonIdealText>
          ) : (
            <FormControlLabel
              control={<Radio />}
              value={null}
              label={
                <SidebarNonIdealText>
                  Let's keep thinking...
                </SidebarNonIdealText>
              }
              style={{ fontFamily: theme.fontFamily }}
            />
          )}
        </RadioGroup>
      </FormControl>
    </SidebarContent>
  );
};
