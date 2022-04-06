import { useState, useCallback } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { LobbyClient } from "boardgame.io/client";
import { styled, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  LETTER_JOY,
  MIN_NUM_PLAYERS,
  MAX_NUM_PLAYERS,
} from "../../game/constants";
import { SERVER_HOST } from "../host";
import { LargeButton } from "./largeButton";
import { LobbyPage } from "./LobbyPage";

const FormRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "48px",
  marginTop: "32px",
  marginBottom: "32px",
});
const FormLabel = styled("label")({ fontSize: "18pt" });

export const CreateRoom = () => {
  const [numPlayers, setNumPlayers] = useState(MAX_NUM_PLAYERS);

  const navigate = useNavigate();
  const lobbyClient = new LobbyClient({ server: SERVER_HOST });
  const createRoom = useCallback(async () => {
    const { matchID } = await lobbyClient.createMatch(LETTER_JOY, {
      numPlayers,
      unlisted: true,
    });
    navigate(`/room/${matchID}`);
  }, [numPlayers]);

  return (
    <LobbyPage>
      <h1>Game setup</h1>
      <FormControl>
        <FormRow>
          <FormLabel># of Players</FormLabel>
          <Select
            id="num-players-select"
            value={`${numPlayers}`}
            onChange={(event: SelectChangeEvent) =>
              setNumPlayers(+event.target.value)
            }
          >
            {_.range(MIN_NUM_PLAYERS, MAX_NUM_PLAYERS + 1).map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormRow>
      </FormControl>
      <LargeButton
        size="large"
        variant="contained"
        color="primary"
        onClick={createRoom}
      >
        Create room
      </LargeButton>
    </LobbyPage>
  );
};
