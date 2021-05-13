import { ClueTokenPlacement, PlayerViewG } from "../../../game/types";
import { ProposingContent } from "./ProposingContent";
import { VotingContent } from "./VotingContent";

interface Props {
  g: PlayerViewG;
  currentPlayer: string | null;
  clueProposingPlacement: ClueTokenPlacement | null;
  onStartProposing: () => void;
  onConfirmProposing?: () => void;
  onCancelProposing: () => void;
  onChangeVote: (clueIndex: number | null) => void;
}

export const ChoosingClueContent = (props: Props) => {
  const {
    g,
    currentPlayer,
    clueProposingPlacement,
    onStartProposing,
    onConfirmProposing,
    onCancelProposing,
    onChangeVote,
  } = props;
  return clueProposingPlacement == null ? (
    <VotingContent
      g={g}
      currentPlayer={currentPlayer}
      onStartProposing={onStartProposing}
      onChangeVote={onChangeVote}
    />
  ) : (
    <ProposingContent
      g={g}
      clueProposingPlacement={clueProposingPlacement}
      onConfirmProposing={onConfirmProposing}
      onCancelProposing={onCancelProposing}
    />
  );
};
