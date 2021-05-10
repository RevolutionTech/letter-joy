import { styled, Radio, FormControlLabel, Chip } from "@material-ui/core";
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
  proposedClue: PlayerViewProposedClue;
  value: string;
  disabled?: boolean;
}

export const ProposedClueRadioButton = (props: Props) => {
  const { g, proposedClue, value, disabled } = props;
  const { authorID, placement, summary } = proposedClue;
  const authorName = g.players[+authorID].playerName;
  const { numLetters, usesWild, numPlayers } = summary;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControlLabel
        value={value}
        disabled={disabled}
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
      <div>
        {proposedClue.votes.map((playerID) => (
          <Chip
            label={g.players[+playerID].playerName}
            style={{ marginRight: "8px", marginTop: "8px" }}
          />
        ))}
      </div>
    </div>
  );
};
