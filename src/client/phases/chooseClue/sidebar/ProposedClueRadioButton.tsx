import { styled } from "@material-ui/core";
import FontDownloadIcon from "@material-ui/icons/FontDownload";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";

import {
  Letter,
  PlayerViewG,
  PlayerViewProposedClue,
} from "../../../../game/types";
import { ClueDisplay } from "../../../cards/ClueDisplay";
import theme from "../../../theme";
import { VoteOption } from "./VoteOption";

const ClueVoteOption = styled(VoteOption)({ marginTop: "16px" });

const SidebarProposedClueSummary = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",

  fontFamily: theme.fontFamily,
  fontSize: "16pt",
});

const SidebarProposedClueSummaryDetail = styled("div")({
  display: "flex",
  alignItems: "center",
  minWidth: "48px",
  marginRight: "8px",
});

const SidebarProposedClueDisplay = styled(SidebarProposedClueSummaryDetail)({
  fontSize: "12pt",
  fontWeight: "lighter",
});

interface Props {
  g: PlayerViewG;
  proposedClue: PlayerViewProposedClue;
  value: string;
  disabled?: boolean;
}

export const ProposedClueRadioButton = (props: Props) => {
  const { g, proposedClue, value, disabled } = props;
  const { authorID, spelling, summary } = proposedClue;
  const authorName = g.players[+authorID].playerName;
  const { numLetters, usesWild, numPlayers } = summary;

  return (
    <ClueVoteOption
      g={g}
      votes={proposedClue.votes}
      value={value}
      disabled={disabled}
    >
      <SidebarProposedClueSummary>
        <SidebarProposedClueSummaryDetail style={{ minWidth: "80px" }}>
          <FontDownloadIcon style={{ marginRight: "4px" }} />
          <div>{numLetters}</div>
          {usesWild && <div>{Letter.WILD}</div>}
        </SidebarProposedClueSummaryDetail>
        <SidebarProposedClueSummaryDetail>
          <GroupIcon style={{ marginRight: "4px" }} />
          <div>{numPlayers}</div>
        </SidebarProposedClueSummaryDetail>
        <SidebarProposedClueSummaryDetail>
          <PersonIcon style={{ marginRight: "4px" }} />
          <div>{authorName}</div>
        </SidebarProposedClueSummaryDetail>
        {spelling && (
          <SidebarProposedClueDisplay>
            (<ClueDisplay g={g} spelling={spelling} />)
          </SidebarProposedClueDisplay>
        )}
      </SidebarProposedClueSummary>
    </ClueVoteOption>
  );
};
