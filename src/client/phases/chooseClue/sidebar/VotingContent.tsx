import _ from "lodash";
import {
  styled,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { playerHasHintAvailable } from "../../../../game/hints";
import { PlayerViewG } from "../../../../game/types";
import { Button } from "../../../panels/Button";
import { SidebarContent } from "../../../panels/sidebar/SidebarContent";
import theme from "../../../theme";
import { ProposedClueRadioButton } from "./ProposedClueRadioButton";

const SidebarNonIdealText = styled("p")({
  fontFamily: theme.fontFamily,
  fontSize: "16pt",
  fontWeight: "lighter",
});

enum SpecialVote {
  RESET_SUPPORT = "Reset support",
}

interface Props {
  g: PlayerViewG;
  currentPlayer: string | null;
  onStartProposing: () => void;
  onResetSupport: () => void;
  onSupportClue: (clueIndex: number) => void;
}

export const VotingContent = (props: Props) => {
  const {
    g,
    currentPlayer,
    onStartProposing,
    onResetSupport,
    onSupportClue,
  } = props;
  const { proposedClues } = g;
  const supportedClueIndex =
    currentPlayer == null
      ? -1
      : _.findIndex(proposedClues, (proposedClue) =>
          proposedClue.votes.includes(currentPlayer)
        );
  return (
    <SidebarContent
      header="Proposed clues"
      buttons={
        currentPlayer == null
          ? []
          : [
              <Button
                key="propose"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                disabled={!playerHasHintAvailable(g, currentPlayer)}
                onClick={onStartProposing}
              >
                Propose
              </Button>,
            ]
      }
    >
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Vote on proposed clues"
          name="proposed-clues"
          value={
            supportedClueIndex === -1
              ? SpecialVote.RESET_SUPPORT
              : `${supportedClueIndex}`
          }
          onChange={(_, value) =>
            value === SpecialVote.RESET_SUPPORT
              ? onResetSupport()
              : onSupportClue(+value)
          }
        >
          {proposedClues.map((proposedClue, i) => (
            <ProposedClueRadioButton
              key={i}
              g={g}
              proposedClue={proposedClue}
              value={`${i}`}
              disabled={currentPlayer == null}
            />
          ))}
          {proposedClues.length === 0 ? (
            <SidebarNonIdealText>No clues proposed yet.</SidebarNonIdealText>
          ) : (
            currentPlayer != null && (
              <FormControlLabel
                control={<Radio />}
                value={SpecialVote.RESET_SUPPORT}
                disabled={currentPlayer == null}
                label={
                  <SidebarNonIdealText>
                    Let's keep thinking...
                  </SidebarNonIdealText>
                }
                style={{ fontFamily: theme.fontFamily }}
              />
            )
          )}
        </RadioGroup>
      </FormControl>
    </SidebarContent>
  );
};
