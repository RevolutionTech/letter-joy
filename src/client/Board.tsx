import { BoardProps } from "boardgame.io/react";
import { styled } from "@material-ui/core";

import { G } from "../game/types";
import { SIDEBAR_WIDTH, SIDEBAR_PADDING, ActionSidebar } from "./ActionSidebar";
import { PlayerDisplay } from "./display/PlayerDisplay";
import { TeamDisplay } from "./display/TeamDisplay";
import theme from "./theme";

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

export const LetterJoyBoard = (props: BoardProps) => {
  const g: G = props.G;
  const playerDisplays = Object.values(g.players).map((playerState, i) => (
    <PlayerDisplay
      key={playerState.playerID}
      {...playerState}
      teamHintsAvailable={g.teamHints.available}
    />
  ));
  return (
    <>
      <GameTable>
        <PlayerRows>
          {playerDisplays}
          <TeamDisplay teamHints={g.teamHints} />
        </PlayerRows>
        <SidebarPlaceholder />
      </GameTable>
      <ActionSidebar />
    </>
  );
};
