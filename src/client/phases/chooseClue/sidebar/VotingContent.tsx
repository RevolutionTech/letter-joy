import _ from "lodash";
import { styled, FormControl, RadioGroup } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { playerHasHintAvailable } from "../../../../game/hints";
import { PlayerViewG } from "../../../../game/types";
import { Button } from "../../../panels/Button";
import { SidebarContent } from "../../../panels/sidebar/SidebarContent";
import theme from "../../../theme";
import { ProposedClueRadioButton } from "./ProposedClueRadioButton";
import { VoteOption } from "./VoteOption";

const SidebarNonIdealText = styled("div")({
  fontFamily: theme.fontFamily,
  fontSize: "16pt",
  fontWeight: "lighter",
});

enum SpecialVote {
  RESET_SUPPORT = "Reset support",
  SUPPORT_END = "Support end",
}

const voteValue = (g: PlayerViewG, currentPlayer: string | null): string => {
  if (currentPlayer == null) {
    return SpecialVote.RESET_SUPPORT;
  } else if (g.endGameVotes.includes(currentPlayer)) {
    return SpecialVote.SUPPORT_END;
  } else {
    const supportedClueIndex = _.findIndex(g.proposedClues, (proposedClue) =>
      proposedClue.votes.includes(currentPlayer)
    );
    if (supportedClueIndex === -1) {
      return SpecialVote.RESET_SUPPORT;
    } else {
      return `${supportedClueIndex}`;
    }
  }
};

interface Props {
  g: PlayerViewG;
  currentPlayer: string | null;
  onStartProposing: () => void;
  onResetSupport: () => void;
  onSupportClue: (clueIndex: number) => void;
  onSupportEnd: () => void;
}

export const VotingContent = (props: Props) => {
  const {
    g,
    currentPlayer,
    onStartProposing,
    onResetSupport,
    onSupportClue,
    onSupportEnd,
  } = props;
  const { proposedClues } = g;
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
          value={voteValue(g, currentPlayer)}
          onChange={(_, value) => {
            switch (value) {
              case SpecialVote.RESET_SUPPORT:
                onResetSupport();
                break;
              case SpecialVote.SUPPORT_END:
                onSupportEnd();
                break;
              default:
                onSupportClue(+value);
            }
          }}
        >
          {proposedClues.length === 0 ? (
            <SidebarNonIdealText>No clues proposed yet.</SidebarNonIdealText>
          ) : (
            proposedClues.map((proposedClue, i) => (
              <ProposedClueRadioButton
                key={i}
                g={g}
                proposedClue={proposedClue}
                value={`${i}`}
                disabled={currentPlayer == null}
              />
            ))
          )}
          {/* TODO: Construct implicit votes of players doing nothing */}
          <VoteOption
            g={g}
            votes={[]}
            value={SpecialVote.RESET_SUPPORT}
            disabled={currentPlayer == null}
          >
            <SidebarNonIdealText>Let's keep thinking...</SidebarNonIdealText>
          </VoteOption>
          <VoteOption
            g={g}
            votes={g.endGameVotes}
            value={SpecialVote.SUPPORT_END}
            disabled={currentPlayer == null}
          >
            <SidebarNonIdealText>
              Let's spell our secret words...
            </SidebarNonIdealText>
          </VoteOption>
        </RadioGroup>
      </FormControl>
    </SidebarContent>
  );
};
