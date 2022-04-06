import { useState } from "react";
import { styled, FormControl, TextField } from "@mui/material";

import { LargeButton } from "../largeButton";
import { LobbyPage } from "../LobbyPage";

const SaveButton = styled(LargeButton)({ marginTop: "24px" });

interface Props {
  initialPlayerName?: string;
  onUpdatePlayerName: (playerName: string) => void;
}

export const SetPlayerName = (props: Props) => {
  const [playerName, setPlayerName] = useState<string>(
    props.initialPlayerName ?? ""
  );
  return (
    <LobbyPage>
      <h1>What&apos;s your name?</h1>
      <FormControl>
        <TextField
          hiddenLabel
          variant="filled"
          value={playerName}
          placeholder="Lizzie Bennet"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPlayerName(event.target.value)
          }
        />
      </FormControl>
      <SaveButton
        size="large"
        variant="contained"
        color="primary"
        disabled={playerName.length === 0}
        onClick={() => props.onUpdatePlayerName(playerName)}
      >
        Save
      </SaveButton>
    </LobbyPage>
  );
};
