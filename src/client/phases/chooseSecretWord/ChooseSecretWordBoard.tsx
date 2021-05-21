import { useMemo } from "react";
import { BoardProps } from "boardgame.io/react";

import { getPlayersActing } from "../../../game/phases";
import { getLeftPlayerID } from "../../../game/players";
import { PlayerViewG } from "../../../game/types";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { Sidebar } from "../../sidebar/Sidebar";
import { WaitingContent } from "../../sidebar/WaitingContent";
import { ChooseSecretWordContent } from "./ChooseSecretWordContent";

export const ChooseSecretWordBoard = (props: BoardProps) => {
  const g: PlayerViewG = props.G;
  const currentPlayer = props.playerID;

  const playersActing = useMemo(() => getPlayersActing(props.ctx), [props.ctx]);

  if (currentPlayer != null && playersActing.includes(currentPlayer)) {
    const leftPlayerID = getLeftPlayerID(+currentPlayer);
    const leftPlayerName = g.players[leftPlayerID].playerName;
    return (
      <ChooseSecretWordContent
        wordConstructionLetters={g.wordConstructionLetters}
        leftPlayerName={leftPlayerName}
        onConfirmSecretWord={props.moves.chooseSecretWord}
      />
    );
  } else {
    return (
      <>
        <ActiveTableDisplay g={g} />
        <Sidebar g={g}>
          <WaitingContent
            g={g}
            description="Waiting for other players to choose a secret word:"
            playersActing={playersActing}
          />
        </Sidebar>
      </>
    );
  }
};
