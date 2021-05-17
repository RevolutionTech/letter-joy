import { styled } from "@material-ui/core";

import { ClueTokenPlacement, PlayerViewG } from "../../game/types";
import { getTokensAssignedToOwner } from "../cards/clueTokenPlacement";
import { SIDEBAR_WIDTH, SIDEBAR_PADDING } from "../sidebar/ActionSidebar";
import theme from "../theme";
import { PlayerDisplay } from "./PlayerDisplay";
import { TeamDisplay } from "./TeamDisplay";

const GameTable = styled("div")({
  display: "flex",
  backgroundColor: theme.silver,
});

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
  clueTokenPlacement: ClueTokenPlacement;
  onAddToClue?: (ownerID: string) => void;
}

export const ActiveTableDisplay = (props: Props) => {
  const { g, clueTokenPlacement, onAddToClue } = props;

  const playerDisplays = Object.values(g.players).map((playerState) => {
    return (
      <PlayerDisplay
        key={playerState.playerID}
        {...playerState}
        teamHintsAvailable={g.teamHints.available}
        containsTokens={getTokensAssignedToOwner(
          clueTokenPlacement,
          playerState.playerID
        )}
        onAddToClue={() => onAddToClue?.(playerState.playerID)}
      />
    );
  });

  return (
    <GameTable>
      <PlayerRows>
        {playerDisplays}
        <TeamDisplay
          teamHints={g.teamHints}
          containsTokens={getTokensAssignedToOwner(clueTokenPlacement, "TEAM")}
          onAddToClue={() => onAddToClue?.("TEAM")}
        />
      </PlayerRows>
      <SidebarPlaceholder />
    </GameTable>
  );
};
