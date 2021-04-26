import { styled } from "@material-ui/core";

import UnusedHint from "./assets/hints/unused.svg";
import { Card } from "./Card";
import { Letter } from "./letters";

const PlayerInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  marginLeft: "32px",
  marginTop: "48px",
  fontSize: "28pt",
});

const PlayerPublicInfo = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "248px",
  marginRight: "32px",
});

const Hint = styled("img")({
  width: "24px",
  marginTop: "16px",
  marginRight: "8px",
});

const PlayerHand = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
});

interface Props {
  playerName: string;
  letters: Letter[];
}

export const PlayerDisplay = (props: Props) => {
  const { playerName, letters } = props;
  return (
    <PlayerInfo>
      <PlayerPublicInfo>
        <div>{playerName}</div>
        <div>
          <Hint src={UnusedHint} alt="Unused hint" />
          <Hint src={UnusedHint} alt="Unused hint" />
        </div>
      </PlayerPublicInfo>
      <PlayerHand>
        {letters.map((letter, i) => (
          <Card letter={letter} visible={i === 0} />
        ))}
      </PlayerHand>
    </PlayerInfo>
  );
};
