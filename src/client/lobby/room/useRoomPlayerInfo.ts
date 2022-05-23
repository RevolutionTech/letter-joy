import { useMemo, useEffect, useCallback, useState } from "react";
import _ from "lodash";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { LobbyClient } from "boardgame.io/client";

import { LETTER_JOY } from "../../../game/constants";
import { SERVER_HOST } from "../../host";
import { Player } from "./types";

export const isRoomOpen = (players: Player[]) =>
  players.length === 0 || _.some(players, (player) => player.name == null);

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
  const isThisRoomOpen = isRoomOpen(players);
  const [updatePlayersTimer, setUpdatePlayersTimer] =
    useState<NodeJS.Timer | null>(null);

  const lobbyClient = useMemo(
    () => new LobbyClient({ server: SERVER_HOST }),
    [SERVER_HOST]
  );
  const fetchMatch = useCallback(async () => {
    if (matchID == null) {
      return;
    }

    try {
      const match = await lobbyClient.getMatch(LETTER_JOY, matchID);
      setPlayers(match.players);
      return match;
    } catch {
      // User attempts to fetch match that no longer exists
      // TODO: Mark the match ID as invalid so that 404 can be shown
      setPlayers([]);
      return;
    }
  }, [matchID, lobbyClient, setPlayers]);
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
    const match = await fetchMatch();
    if (match == null) {
      return;
    }

    // Set another timer if still waiting on players
    // TODO: Fix infinite recursion when tab is left open
    if (isRoomOpen(match.players)) {
      setTimeout(updatePlayers, 5000);
    }
  }, [lobbyClient, updatePlayersTimer, setPlayers, setUpdatePlayersTimer]);

  useEffect(() => {
    if (
      !matchID ||
      !isThisRoomOpen ||
      playerName == null ||
      playerInfo != null
    ) {
      return;
    }

    joinRoom(matchID, playerName);
  }, [matchID, isThisRoomOpen, playerName, playerInfo]);

  useEffect(() => {
    if (playerInfo == null) {
      fetchMatch();
    } else {
      updatePlayers();
    }
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
