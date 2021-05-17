import { styled } from "@material-ui/core";

import { PlayerViewG } from "../../game/types";
import { ClueDisplay } from "../cards/ClueDisplay";
import theme from "../theme";
import { SidebarList } from "./SidebarList";

export const SIDEBAR_WIDTH = "400px";
export const SIDEBAR_PADDING = "24px";

const FixedSidebar = styled("div")({
  position: "fixed",
  top: "0",
  right: "0",
  width: SIDEBAR_WIDTH,
  height: "100%",
  padding: SIDEBAR_PADDING,

  backgroundColor: theme.white,
});

interface Props {
  g: PlayerViewG;
}

export const Sidebar = (props: React.PropsWithChildren<Props>) => (
  <FixedSidebar>
    {props.children}
    {props.g.previousClues.length > 0 && (
      <>
        <div style={{ fontSize: "18pt" }}>Previous Clues</div>
        <SidebarList>
          {props.g.previousClues.map((previousClue, i) => (
            <li key={i}>
              <ClueDisplay
                g={props.g}
                tokenPlacement={previousClue.placement}
              />
            </li>
          ))}
        </SidebarList>
      </>
    )}
  </FixedSidebar>
);
