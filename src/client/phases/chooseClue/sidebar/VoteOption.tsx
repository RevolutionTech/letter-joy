import { Radio, FormControlLabel, Chip } from "@mui/material";

import {
  MaybePlayerNames,
  playerNameDisplay,
} from "../../../display/playerName";

interface Props {
  playerNames: MaybePlayerNames;
  votes: string[];
  value: string;
  disabled?: boolean;
}

export const VoteOption = (props: React.PropsWithChildren<Props>) => {
  const { playerNames, votes, value, disabled, children } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControlLabel
        value={value}
        disabled={disabled}
        control={<Radio />}
        label={children}
        style={{ marginTop: "16px" }}
      />
      <div>
        {votes.map((playerID) => (
          <Chip
            key={playerID}
            label={playerNameDisplay(playerNames, +playerID)}
            style={{ marginRight: "8px", marginTop: "8px" }}
          />
        ))}
      </div>
    </div>
  );
};
