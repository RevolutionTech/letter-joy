import { useMemo, useEffect, useCallback, useState } from "react";
import _ from "lodash";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { LobbyClient } from "boardgame.io/client";

import { LETTER_JOY } from "../../../game/constants";
import { SERVER_HOST } from "../../host";
import { Player } from "./types";

export const useRoomPlayerInfo = () => {
  const params = useParams();
  const { matchID } = params;
  const [cookies, setCookie] = useCookies([
    "letterjoyPlayerName",
    "letterjoyPlayerInfo",
  ]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [playerName, setPlayerName] = useState<string | undefined>(
    cookies.letterjoyPlayerName
  );
  const [playerInfo, setPlayerInfo] = useState<
    | {
        playerID: string;
        playerCredentials: string;
      }
    | undefined
  >(cookies.letterjoyPlayerInfo);
  const [players, setPlayers] = useState<Player[]>([]);
  const [updatePlayersTimer, setUpdatePlayersTimer] =
    useState<NodeJS.Timer | null>(null);

  const lobbyClient = useMemo(
    () => new LobbyClient({ server: SERVER_HOST }),
    [SERVER_HOST]
  );
  const updatePlayerName = useCallback(
    async (newName: string) => {
      if (newName !== playerName) {
        setPlayerName(newName);
        setCookie("letterjoyPlayerName", newName);
        if (matchID != null && playerInfo != null) {
          await lobbyClient.updatePlayer(LETTER_JOY, matchID, {
            playerID: playerInfo.playerID,
            credentials: playerInfo.playerCredentials,
            newName,
          });
        }
      }
      setIsEditingName(false);
    },
    [
      matchID,
      playerName,
      playerInfo,
      lobbyClient,
      setIsEditingName,
      setPlayerName,
      setCookie,
    ]
  );
  const joinRoom = useCallback(
    async (matchID: string, playerName: string) => {
      // TODO: Handle case where user attempts to join match that no longer exists
      // TODO: Handle case where user attempts to join a full match
      const joinedPlayerInfo = await lobbyClient.joinMatch(
        LETTER_JOY,
        matchID,
        {
          playerName,
        }
      );
      setPlayerInfo(joinedPlayerInfo);
      setCookie("letterjoyPlayerInfo", joinedPlayerInfo, {
        path: window.location.pathname,
      });
    },
    [window.location.pathname, lobbyClient, setPlayerInfo, setCookie]
  );
  const updatePlayers = useCallback(async () => {
    if (matchID == null || playerName == null || playerInfo == null) {
      return;
    }

    // TODO: Handle case where user attempts to fetch match that no longer exists
    const match = await lobbyClient.getMatch(LETTER_JOY, matchID);
    setPlayers(match.players);

    // Set another timer if still waiting on players
    // TODO: Fix infinite recursion when tab is left open
    if (
      match.players.length === 0 ||
      _.some(match.players, (player) => player.name == null)
    ) {
      setTimeout(updatePlayers, 5000);
    }
  }, [
    matchID,
    playerName,
    playerInfo,
    lobbyClient,
    updatePlayersTimer,
    setPlayers,
    setUpdatePlayersTimer,
  ]);

  useEffect(() => {
    if (!matchID || playerName == null || playerInfo != null) {
      return;
    }

    joinRoom(matchID, playerName);
  }, [matchID, playerName, playerInfo]);

  useEffect(() => {
    if (playerInfo == null) {
      return;
    }

    updatePlayers();
  }, [playerInfo == null]);

  return [
    matchID,
    isEditingName,
    playerName,
    playerInfo,
    players,
    setIsEditingName,
    updatePlayerName,
  ] as const;
};
