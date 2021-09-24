import { BoardProps } from "boardgame.io/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { styled } from "@material-ui/core";

import { GameBoard } from "./GameBoard";

const ScrollableFullScreen = styled(FullScreen)({ overflow: "auto" });

export const LetterJoyBoard = (props: BoardProps) => {
  const fshandle = useFullScreenHandle();

  return (
    <>
      <button onClick={fshandle.enter}>Return to game (fullscreen)</button>
      <ScrollableFullScreen handle={fshandle}>
        {fshandle.active && <GameBoard {...props} />}
      </ScrollableFullScreen>
    </>
  );
};
