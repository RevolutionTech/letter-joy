import { PlayerViewG } from "../../game/types";
import { ProposingContent } from "./ProposingContent";
import { VotingContent } from "./VotingContent";

interface Props {
  g: PlayerViewG;
  currentPlayer: string | null;
  clueProposing: string | null;
  onStartProposing: () => void;
  onConfirmProposing?: () => void;
  onCancelProposing: () => void;
  onChangeVote: (clueIndex: number | null) => void;
}

export const ChoosingClueContent = (props: Props) => {
  const {
    g,
    currentPlayer,
    clueProposing,
    onStartProposing,
    onConfirmProposing,
    onCancelProposing,
    onChangeVote,
  } = props;
  return clueProposing == null ? (
    <VotingContent
      g={g}
      currentPlayer={currentPlayer}
      onStartProposing={onStartProposing}
      onChangeVote={onChangeVote}
    />
  ) : (
    <ProposingContent
      clueProposing={clueProposing}
      onConfirmProposing={onConfirmProposing}
      onCancelProposing={onCancelProposing}
    />
  );
};
