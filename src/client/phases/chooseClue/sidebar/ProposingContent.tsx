import { styled } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Spelling, PlayerViewG } from "../../../../game/types";
import { ClueDisplay } from "../../../cards/ClueDisplay";
import { DisplayStatus } from "../../../display/DisplayCell";
import {
  getOrderedPlayers,
  MaybePlayerNames,
  playerNameDisplay,
} from "../../../display/players";
import { Button } from "../../../panels/MUI";
import { SidebarContent } from "../../../panels/sidebar/SidebarContent";
import theme from "../../../theme";

const CluePlayerPreviews = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  marginTop: "32px",
});
const CluePlayerPreview = styled("div")({
  display: "flex",
  flexDirection: "column",
});
const PlayerPreviewDisplayStatus = styled(DisplayStatus)({
  fontSize: "14pt",
  color: theme.grey,
});

interface Props {
  g: PlayerViewG;
  playerNames: MaybePlayerNames;
  currentPlayer: string | null;
  clueProposingPlacement: Spelling;
  onConfirmProposing?: () => void;
  onCancelProposing: () => void;
}

export const ProposingContent = (props: Props) => {
  const {
    g,
    playerNames,
    currentPlayer,
    clueProposingPlacement,
    onConfirmProposing,
    onCancelProposing,
  } = props;
  const orderedPlayers = getOrderedPlayers(g, currentPlayer);
  const otherPlayers = orderedPlayers.filter(
    (player) => player.playerID !== currentPlayer
  );
  return (
    <SidebarContent
      header="Proposing clue"
      buttons={[
        <Button
          key="confirm"
          variant="contained"
          color="primary"
          disabled={onConfirmProposing == null}
          onClick={onConfirmProposing}
        >
          Confirm
        </Button>,
        <Button key="cancel" variant="outlined" onClick={onCancelProposing}>
          Cancel
        </Button>,
      ]}
    >
      <ClueDisplay g={g} spelling={clueProposingPlacement} />
      {clueProposingPlacement.length > 0 && (
        <CluePlayerPreviews>
          {otherPlayers.map((player) => {
            const otherPlayerG = {
              ...g,
              players: {
                ...g.players,
                [+player.playerID]: {
                  ...g.players[+player.playerID],
                  letters: g.players[+player.playerID].letters.map(() => null),
                  bonusLetter: null,
                },
              },
            };
            return (
              <CluePlayerPreview key={player.playerID}>
                <PlayerPreviewDisplayStatus>
                  <VisibilityIcon style={{ marginRight: "4px" }} />
                  {playerNameDisplay(playerNames, +player.playerID)}
                </PlayerPreviewDisplayStatus>
                <ClueDisplay
                  g={otherPlayerG}
                  spelling={clueProposingPlacement}
                  maxFontSize={48}
                />
              </CluePlayerPreview>
            );
          })}
        </CluePlayerPreviews>
      )}
    </SidebarContent>
  );
};
