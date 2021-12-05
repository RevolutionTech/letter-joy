import { Radio, FormControlLabel, Chip } from "@mui/material";

import {
  MaybePlayerNames,
  playerNameDisplay,
} from "../../../display/playerName";

interface Props {
  playerNames: MaybePlayerNames;
  votes: string[];
  value: string;
  label: React.ReactElement;
  disabled?: boolean;
}

export const VoteOption = (props: Props) => {
  const { playerNames, votes, value, label, disabled } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControlLabel
        value={value}
        control={<Radio />}
        label={label}
        disabled={disabled}
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
