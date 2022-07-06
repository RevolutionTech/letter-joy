import _ from "lodash";
import { styled, RadioGroup } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { playerHasHintAvailable } from "../../../../game/hints";
import { PlayerViewG } from "../../../../game/types";
import { MaybePlayerNames } from "../../../display/players";
import { Button } from "../../../panels/MUI";
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
  playerNames: MaybePlayerNames;
  currentPlayer: string | null;
  onStartProposing: () => void;
  onRemoveClue: (clueIndex: number) => void;
  onResetSupport: () => void;
  onSupportClue: (clueIndex: number) => void;
  onSupportEnd: () => void;
}

export const VotingContent = (props: Props) => {
  const {
    g,
    playerNames,
    currentPlayer,
    onStartProposing,
    onRemoveClue,
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
          proposedClues.map(
            (proposedClue, i) =>
              proposedClue.active && (
                <ProposedClueRadioButton
                  key={i}
                  g={g}
                  playerNames={playerNames}
                  proposedClue={proposedClue}
                  value={`${i}`}
                  disabled={currentPlayer == null}
                  onRemoveClue={
                    currentPlayer != null &&
                    currentPlayer === proposedClue.authorID
                      ? () => onRemoveClue(i)
                      : undefined
                  }
                />
              )
          )
        )}
        <VoteOption
          playerNames={playerNames}
          votes={[]}
          value={SpecialVote.RESET_SUPPORT}
          label={
            <SidebarNonIdealText>
              Let&apos;s keep thinking...
            </SidebarNonIdealText>
          }
          disabled={currentPlayer == null}
        />
        <VoteOption
          playerNames={playerNames}
          votes={g.endGameVotes}
          value={SpecialVote.SUPPORT_END}
          label={
            <SidebarNonIdealText>
              Let&apos;s spell our secret words...
            </SidebarNonIdealText>
          }
          disabled={currentPlayer == null}
        />
      </RadioGroup>
    </SidebarContent>
  );
};
