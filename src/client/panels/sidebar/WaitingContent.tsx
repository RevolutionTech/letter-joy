import { MaybePlayerNames, playerNameDisplay } from "../../display/players";
import { SidebarList } from "./SidebarList";

interface Props {
  playerNames: MaybePlayerNames;
  description: string;
  playersActing: string[];
}

export const WaitingContent = (props: Props) => {
  const { playerNames, description, playersActing } = props;
  return (
    <>
      <div style={{ fontSize: "16pt" }}>{description}</div>
      <SidebarList>
        {playersActing.map((playerID) => (
          <li key={playerID}>{playerNameDisplay(playerNames, +playerID)}</li>
        ))}
      </SidebarList>
    </>
  );
};
