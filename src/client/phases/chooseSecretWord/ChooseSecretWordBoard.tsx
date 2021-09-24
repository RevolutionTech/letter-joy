import { useMemo } from "react";
import { BoardProps } from "boardgame.io/react";

import { getLeftPlayerID, getPlayersActing } from "../../../game/players";
import { PlayerViewG } from "../../../game/types";
import { ActiveTableDisplay } from "../../display/ActiveTableDisplay";
import { playerNameDisplay } from "../../display/playerName";
import { Sidebar } from "../../panels/sidebar/Sidebar";
import { WaitingContent } from "../../panels/sidebar/WaitingContent";
import { ChooseSecretWordContent } from "./ChooseSecretWordContent";

export const ChooseSecretWordBoard = (props: BoardProps) => {
  const g: PlayerViewG = props.G;
  const playerNames = props.matchData;
  const currentPlayer = props.playerID;

  const playersActing = useMemo(() => getPlayersActing(props.ctx), [props.ctx]);

  if (currentPlayer != null && playersActing.includes(currentPlayer)) {
    const leftPlayerID = getLeftPlayerID(+currentPlayer);
    const leftPlayerName = playerNameDisplay(playerNames, leftPlayerID);
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
        <ActiveTableDisplay g={g} playerNames={playerNames} />
        <Sidebar g={g}>
          <WaitingContent
            playerNames={playerNames}
            description="Waiting for other players to choose a secret word:"
            playersActing={playersActing}
          />
        </Sidebar>
      </>
    );
  }
};
