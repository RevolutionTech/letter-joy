import { Radio, FormControlLabel, Chip } from "@material-ui/core";
import { PlayerViewG } from "../../../../game/types";

interface Props {
  g: PlayerViewG;
  votes: string[];
  value: string;
  disabled?: boolean;
}

export const VoteOption = (props: React.PropsWithChildren<Props>) => {
  const { g, votes, value, disabled, children } = props;

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
            label={g.players[+playerID].playerName}
            style={{ marginRight: "8px", marginTop: "8px" }}
          />
        ))}
      </div>
    </div>
  );
};
