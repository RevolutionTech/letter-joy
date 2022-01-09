import { styled, IconButton } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";
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
import {
  MaybePlayerNames,
  playerNameDisplay,
} from "../../../display/playerName";
import theme from "../../../theme";
import { VoteOption } from "./VoteOption";

const ClueVoteOption = styled(VoteOption)({ marginTop: "16px" });

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

const SidebarProposedClueSummaryDetail = styled("div")({
  display: "flex",
  alignItems: "center",
  minWidth: "48px",
  marginRight: "8px",
  whiteSpace: "nowrap",
});

const SidebarProposedClueDisplay = styled(SidebarProposedClueSummaryDetail)({
  fontSize: "12pt",
  fontWeight: "lighter",
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
  const { numLetters, usesWild, numNonPlayers, numPlayers } = summary;

  return (
    <ClueVoteOption
      playerNames={playerNames}
      votes={proposedClue.votes}
      value={value}
      label={
        <SidebarProposedClueSummary>
          <SidebarProposedClueRow>
            <SidebarProposedClueSummaryDetail style={{ minWidth: "80px" }}>
              <FontDownloadIcon style={{ marginRight: "4px" }} />
              <div>{numLetters}</div>
              {usesWild && <div>{Letter.WILD}</div>}
            </SidebarProposedClueSummaryDetail>
            <SidebarProposedClueSummaryDetail>
              <GroupIcon style={{ marginRight: "4px" }} />
              <div>{numPlayers}</div>
            </SidebarProposedClueSummaryDetail>
            {g.nonPlayers.length > 0 && (
              <SidebarProposedClueSummaryDetail>
                <ChairIcon style={{ marginRight: "4px" }} />
                <div>{numNonPlayers}</div>
              </SidebarProposedClueSummaryDetail>
            )}
            <SidebarProposedClueSummaryDetail>
              <PersonIcon style={{ marginRight: "4px" }} />
              <div>{authorName}</div>
            </SidebarProposedClueSummaryDetail>
            {onRemoveClue != null && (
              <IconButton onClick={onRemoveClue}>
                <DeleteIcon />
              </IconButton>
            )}
          </SidebarProposedClueRow>
          {spelling && (
            <SidebarProposedClueDisplay>
              (<ClueDisplay g={g} spelling={spelling} />)
            </SidebarProposedClueDisplay>
          )}
        </SidebarProposedClueSummary>
      }
      disabled={disabled}
    />
  );
};
