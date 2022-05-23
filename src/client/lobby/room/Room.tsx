import { SocketIO } from "boardgame.io/multiplayer";
import { Client } from "boardgame.io/react";

import { LetterJoy } from "../../../game/game";
import { GameBoard } from "../../GameBoard";
import { SERVER_HOST } from "../../host";
import { NotFound } from "../NotFound";
import { SetPlayerName } from "./SetPlayerName";
import { isRoomOpen, useRoomPlayerInfo } from "./useRoomPlayerInfo";
import { WaitingRoom } from "./WaitingRoom";

export const Room = () => {
  const [
    matchID,
    isEditingName,
    playerName,
    playerInfo,
    players,
    setIsEditingName,
    updatePlayerName,
  ] = useRoomPlayerInfo();

  if (!matchID) {
    return <NotFound />;
  } else if (isRoomOpen(players)) {
    return isEditingName || playerName == null || playerInfo == null ? (
      <SetPlayerName
        initialPlayerName={playerName}
        onUpdatePlayerName={updatePlayerName}
      />
    ) : (
      <WaitingRoom
        playerID={playerInfo.playerID}
        onEditName={() => setIsEditingName(true)}
        players={players}
      />
    );
  }

  const Game = Client({
    game: LetterJoy,
    board: GameBoard,
    debug: process.env.NODE_ENV === "development",
    multiplayer: SocketIO({ server: SERVER_HOST }),
  });
  return (
    <Game
      matchID={matchID}
      playerID={playerInfo?.playerID}
      credentials={playerInfo?.playerCredentials}
    />
  );
};
