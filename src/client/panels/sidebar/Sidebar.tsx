import { styled } from "@material-ui/core";

import { PlayerViewG } from "../../../game/types";
import { ClueDisplay } from "../../cards/ClueDisplay";
import theme from "../../theme";
import { SidebarList } from "./SidebarList";

const FixedSidebar = styled("div")({
  width: "400px",
  padding: "24px",
  zIndex: 10000, // higher z-index than draggables
  overflowY: "scroll",

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
              <ClueDisplay g={props.g} spelling={previousClue.spelling} />
            </li>
          ))}
        </SidebarList>
      </>
    )}
  </FixedSidebar>
);
