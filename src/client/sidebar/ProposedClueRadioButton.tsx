import { styled, Radio, FormControlLabel } from "@material-ui/core";
import FontDownloadIcon from "@material-ui/icons/FontDownload";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";

import { Letter, PlayerViewG, PlayerViewProposedClue } from "../../game/types";
import { getClueDisplay } from "../cards/clueTokenPlacement";
import theme from "../theme";

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
  proposedClueId: number;
  proposedClue: PlayerViewProposedClue;
}

export const ProposedClueRadioButton = (props: Props) => {
  const { g, proposedClueId, proposedClue } = props;
  const { authorID, placement, summary } = proposedClue;
  const authorName = g.players[+authorID].playerName;
  const { numLetters, usesWild, numPlayers } = summary;

  return (
    <FormControlLabel
      value={proposedClueId}
      control={<Radio />}
      label={
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
          {placement && (
            <SidebarProposedClueDisplay>
              ({getClueDisplay(g, placement)})
            </SidebarProposedClueDisplay>
          )}
        </SidebarProposedClueSummary>
      }
      style={{ marginTop: "16px" }}
    />
  );
};
