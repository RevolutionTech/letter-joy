import { PlayerViewG } from "../../game/types";
import { SidebarList } from "./SidebarList";

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
      <SidebarList>
        {playersActing.map((playerID) => (
          <li key={playerID}>{g.players[+playerID].playerName}</li>
        ))}
      </SidebarList>
    </>
  );
};
