import { styled } from "@mui/material";
import { Chair, FontDownload, Group, Person } from "@mui/icons-material";

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
  playerNames: MaybePlayerNames;
  proposedClue: PlayerViewProposedClue;
  value: string;
  disabled?: boolean;
}

export const ProposedClueRadioButton = (props: Props) => {
  const { g, playerNames, proposedClue, value, disabled } = props;
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
          <SidebarProposedClueSummaryDetail style={{ minWidth: "80px" }}>
            <FontDownload style={{ marginRight: "4px" }} />
            <div>{numLetters}</div>
            {usesWild && <div>{Letter.WILD}</div>}
          </SidebarProposedClueSummaryDetail>
          <SidebarProposedClueSummaryDetail>
            <Group style={{ marginRight: "4px" }} />
            <div>{numPlayers}</div>
          </SidebarProposedClueSummaryDetail>
          {g.nonPlayers.length > 0 && (
            <SidebarProposedClueSummaryDetail>
              <Chair style={{ marginRight: "4px" }} />
              <div>{numNonPlayers}</div>
            </SidebarProposedClueSummaryDetail>
          )}
          <SidebarProposedClueSummaryDetail>
            <Person style={{ marginRight: "4px" }} />
            <div>{authorName}</div>
          </SidebarProposedClueSummaryDetail>
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
