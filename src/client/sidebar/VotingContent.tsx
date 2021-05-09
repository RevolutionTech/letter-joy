import _ from "lodash";
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
  currentPlayer: string;
  onStartProposing: () => void;
  proposedClues: PlayerViewProposedClue[];
  onChangeVote: (clueIndex: number | null) => void;
}

export const VotingContent = (props: Props) => {
  const {
    g,
    currentPlayer,
    onStartProposing,
    proposedClues,
    onChangeVote,
  } = props;
  const supportedClueIndex = _.findIndex(proposedClues, (proposedClue) =>
    proposedClue.votes.includes(currentPlayer)
  );
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
        <RadioGroup
          aria-label="Vote on proposed clues"
          name="proposed-clues"
          value={supportedClueIndex === -1 ? "" : `${supportedClueIndex}`}
          onChange={(_, value) => onChangeVote(value === "" ? null : +value)}
        >
          {proposedClues.map((proposedClue, i) => (
            <ProposedClueRadioButton
              key={i}
              g={g}
              proposedClue={proposedClue}
              value={`${i}`}
            />
          ))}
          {proposedClues.length === 0 ? (
            <SidebarNonIdealText>No clues proposed yet.</SidebarNonIdealText>
          ) : (
            <FormControlLabel
              control={<Radio />}
              value=""
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
