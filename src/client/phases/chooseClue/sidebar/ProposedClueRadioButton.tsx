import { styled, IconButton } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Letter,
  PlayerViewG,
  PlayerViewProposedClue,
} from "../../../../game/types";
import { ClueDisplay } from "../../../cards/ClueDisplay";
import { MaybePlayerNames, playerNameDisplay } from "../../../display/players";
import theme from "../../../theme";
import { VoteOption } from "./VoteOption";

const ClueVoteOption = styled(VoteOption)({ marginTop: "16px" });

const SidebarProposedClueLabel = styled("div")({
  display: "flex",
  alignItems: "center",
});

const SidebarProposedClueSummary = styled("div")({
  display: "flex",
  flexDirection: "column",

  fontFamily: theme.fontFamily,
  fontSize: "16pt",
});

const SidebarProposedClueRow = styled("div")({
  display: "flex",
  alignItems: "center",
});

const SidebarProposedClueSecondaryRow = styled(SidebarProposedClueRow)({
  fontSize: "12pt",
  fontWeight: "lighter",
});

const SidebarProposedClueDetail = styled("div")({
  display: "flex",
  alignItems: "center",
  marginRight: "16px",
  whiteSpace: "nowrap",
});

interface Props {
  g: PlayerViewG;
  playerNames: MaybePlayerNames;
  proposedClue: PlayerViewProposedClue;
  value: string;
  disabled?: boolean;
  onRemoveClue?: () => void;
}

export const ProposedClueRadioButton = (props: Props) => {
  const { g, playerNames, proposedClue, value, disabled, onRemoveClue } = props;
  const { authorID, spelling, summary } = proposedClue;
  const authorName = playerNameDisplay(playerNames, +authorID);
  const { numLetters, usesWild, numBonus, numNonPlayers, numPlayers } = summary;

  return (
    <ClueVoteOption
      playerNames={playerNames}
      votes={proposedClue.votes}
      value={value}
      label={
        <SidebarProposedClueLabel>
          <SidebarProposedClueSummary>
            <SidebarProposedClueRow>
              <SidebarProposedClueDetail>
                <FontDownloadIcon style={{ marginRight: "4px" }} />
                <div>{numLetters}</div>
                {usesWild && <div>{Letter.WILD}</div>}
              </SidebarProposedClueDetail>
              <SidebarProposedClueDetail>
                <GroupIcon style={{ marginRight: "4px" }} />
                <div>{numPlayers}</div>
              </SidebarProposedClueDetail>
              {g.nonPlayers.length > 0 && (
                <SidebarProposedClueDetail>
                  <ChairIcon style={{ marginRight: "4px" }} />
                  <div>{numNonPlayers}</div>
                </SidebarProposedClueDetail>
              )}
              {g.team.bonus.length > 0 && (
                <SidebarProposedClueDetail>
                  <EmojiEventsIcon style={{ marginRight: "4px" }} />
                  <div>{numBonus}</div>
                </SidebarProposedClueDetail>
              )}
            </SidebarProposedClueRow>
            <SidebarProposedClueSecondaryRow>
              <SidebarProposedClueDetail>
                <PersonIcon fontSize="small" style={{ marginRight: "4px" }} />
                <div>{authorName}</div>
              </SidebarProposedClueDetail>
              {spelling && (
                <SidebarProposedClueDetail>
                  (<ClueDisplay g={g} spelling={spelling} />)
                </SidebarProposedClueDetail>
              )}
            </SidebarProposedClueSecondaryRow>
          </SidebarProposedClueSummary>
          {onRemoveClue != null && (
            <IconButton onClick={onRemoveClue}>
              <DeleteIcon />
            </IconButton>
          )}
        </SidebarProposedClueLabel>
      }
      disabled={disabled}
    />
  );
};
