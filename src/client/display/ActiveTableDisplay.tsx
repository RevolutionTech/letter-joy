import { styled } from "@material-ui/core";

import { Spelling, PlayerViewG } from "../../game/types";
import { getCardLocationsAssignedToOwner } from "../cards/spelling";
import { GameTable } from "../display/GameTable";
import { SIDEBAR_WIDTH, SIDEBAR_PADDING } from "../panels/sidebar/Sidebar";
import { PlayerDisplay } from "./PlayerDisplay";
import { TeamDisplay } from "./TeamDisplay";

const PlayerRows = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "48px",
});

// The SidebarPlaceholder allows the horizontal scrollbar to appear
// when the sidebar is covering some of the main content
const SidebarPlaceholder = styled("div")({
  minWidth: `calc(${SIDEBAR_WIDTH} + ${SIDEBAR_PADDING} * 2)`,
});

interface Props {
  g: PlayerViewG;
  spelling?: Spelling;
  onAddToSpelling?: (ownerID: string) => void;
}

export const ActiveTableDisplay = (props: Props) => {
  const { g, spelling, onAddToSpelling } = props;

  const playerDisplays = Object.values(g.players).map((playerState) => {
    return (
      <PlayerDisplay
        key={playerState.playerID}
        {...playerState}
        teamHintsAvailable={g.teamHints.available}
        containsTokens={
          spelling &&
          getCardLocationsAssignedToOwner(spelling, playerState.playerID)
        }
        onAddToSpelling={
          onAddToSpelling && (() => onAddToSpelling(playerState.playerID))
        }
      />
    );
  });

  return (
    <GameTable>
      <PlayerRows>
        {playerDisplays}
        <TeamDisplay
          teamLetters={g.teamLetters}
          teamHints={g.teamHints}
          containsTokens={
            spelling && getCardLocationsAssignedToOwner(spelling, "TEAM")
          }
          onAddToSpelling={onAddToSpelling && (() => onAddToSpelling("TEAM"))}
        />
      </PlayerRows>
      <SidebarPlaceholder />
    </GameTable>
  );
};
