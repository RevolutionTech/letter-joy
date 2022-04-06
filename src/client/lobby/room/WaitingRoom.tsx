import { useState, useCallback } from "react";
import _ from "lodash";
import { styled, IconButton, Snackbar, Alert } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { MAX_NUM_PLAYERS } from "../../../game/constants";
import theme from "../../theme";
import { LobbyPage } from "../LobbyPage";
import { SkeletonListItem, PlayerListItem } from "./PlayerListItem";
import { Player } from "./types";

enum AlertMessage {
  NONE,
  SUCCESS,
  ERROR,
}

const ShareRoomLink = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "calc(80% - 2 * 16px)",
  marginBottom: "48px",
  padding: "20px 16px",
  background: `rgba(${theme.blueRGB}, 0.2)`,
  borderRadius: "12px",
});
const RoomURL = styled("div")({
  flexGrow: "1",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
const BlackCopyIcon = styled(ContentCopyIcon)({ color: theme.black });
const PlayerList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: 0,
  width: "80%",
  listStyle: "none",
});

interface Props {
  playerID: string;
  onEditName: () => void;
  players: Player[];
}

export const WaitingRoom = (props: Props) => {
  const { playerID, onEditName, players } = props;
  const roomURL = window.location.href;
  const [showAlert, setShowAlert] = useState<AlertMessage>(AlertMessage.NONE);
  const handleCloseSnackbar = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      setShowAlert(AlertMessage.NONE);
    },
    [setShowAlert]
  );

  return (
    <LobbyPage>
      <h1>Invite your friends</h1>
      <ShareRoomLink>
        <RoomURL>{roomURL}</RoomURL>
        <IconButton
          onClick={() => {
            try {
              navigator.clipboard.writeText(roomURL);
            } catch {
              setShowAlert(AlertMessage.ERROR);
              return;
            }
            setShowAlert(AlertMessage.SUCCESS);
          }}
        >
          <BlackCopyIcon />
        </IconButton>
      </ShareRoomLink>
      <PlayerList>
        {players.length === 0
          ? _.range(MAX_NUM_PLAYERS).map((i) => <SkeletonListItem key={i} />)
          : players.map((player) => (
              <PlayerListItem
                key={player.id}
                playerName={player.name}
                onEditName={player.id === +playerID ? onEditName : undefined}
              />
            ))}
      </PlayerList>
      <p>The game will begin automatically when all seats are filled.</p>
      <Snackbar
        open={showAlert !== AlertMessage.NONE}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={showAlert === AlertMessage.SUCCESS ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {showAlert === AlertMessage.SUCCESS
            ? "Room link copied successfully!"
            : "Failed to copy room link."}
        </Alert>
      </Snackbar>
    </LobbyPage>
  );
};
