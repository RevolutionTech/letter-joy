import React, { useState } from "react";
import { BoardProps } from "boardgame.io/react";
import { Button, Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { GameBoard } from "./GameBoard";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const LetterJoyBoard = (props: BoardProps) => {
  const [isGameOpen, setIsGameOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsGameOpen(true)}
      >
        Open game
      </Button>
      <Dialog
        fullScreen
        open={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        TransitionComponent={Transition}
      >
        <GameBoard {...props} />
      </Dialog>
    </>
  );
};
