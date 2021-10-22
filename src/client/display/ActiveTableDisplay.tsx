import { styled } from "@material-ui/core";

import { Spelling, PlayerViewG } from "../../game/types";
import { getCardLocationsAssignedToOwner } from "../cards/spelling";
import { GameTable } from "../display/GameTable";
import { SidebarPlaceholder } from "../panels/sidebar/Sidebar";
import { PlayerDisplay } from "./PlayerDisplay";
import { MaybePlayerNames, playerNameDisplay } from "./playerName";
import { TeamDisplay } from "./TeamDisplay";

const PlayerRows = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "24px",
});
interface Props {
  g: PlayerViewG;
  playerNames: MaybePlayerNames;
  spelling?: Spelling;
  onAddToSpelling?: (ownerID: string) => void;
}

export const ActiveTableDisplay = (props: Props) => {
  const { g, playerNames, spelling, onAddToSpelling } = props;

  const playerDisplays = Object.values(g.players).map((playerState) => {
    const playerID = playerState.playerID;
    return (
      <PlayerDisplay
        key={playerID}
        {...playerState}
        playerName={playerNameDisplay(playerNames, +playerID)}
        teamHintsAvailable={g.teamHints.available}
        containsTokens={
          spelling && getCardLocationsAssignedToOwner(spelling, playerID)
        }
        onAddToSpelling={onAddToSpelling && (() => onAddToSpelling(playerID))}
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
