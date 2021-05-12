import { styled } from "@material-ui/core";

import { PlayerViewG } from "../../game/types";

const PlayerList = styled("ul")({
  paddingLeft: "0",
  listStyle: "none",
  "& li": { fontSize: "36pt" },
});

interface Props {
  g: PlayerViewG;
  description: string;
  playersActing: string[];
}

export const WaitingContent = (props: Props) => {
  const { g, description, playersActing } = props;
  return (
    <>
      <div style={{ fontSize: "16pt" }}>{description}</div>
      <PlayerList>
        {playersActing.map((playerID) => (
          <li key={playerID}>{g.players[+playerID].playerName}</li>
        ))}
      </PlayerList>
    </>
  );
};
