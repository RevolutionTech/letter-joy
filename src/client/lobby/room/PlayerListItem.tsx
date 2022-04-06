import { styled, Skeleton, IconButton } from "@mui/material";
import ChairIcon from "@mui/icons-material/Chair";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

import theme from "../../theme";

const StyledListItem = styled("li", {
  shouldForwardProp: (prop) => prop !== "isPlayer",
})<{ isPlayer: boolean }>(({ isPlayer }) => ({
  display: "flex",
  alignItems: "baseline",
  gap: "12px",
  padding: "8px 16px",
  background: `rgba(${theme.silverRGB}, ${isPlayer ? 0.4 : 0.2})`,
  borderRadius: "12px",
  fontSize: "28pt",
}));
const PlayerName = styled("div")({ flexGrow: "1" });
const BlackEditIcon = styled(EditIcon)({ color: theme.black });

export const SkeletonListItem = () => (
  <StyledListItem isPlayer={false}>
    <Skeleton variant="circular" width={24} height={24} />
    <PlayerName>
      <Skeleton variant="text" animation="wave" />
    </PlayerName>
  </StyledListItem>
);

interface Props {
  playerName?: string;
  onEditName?: () => void;
}

export const PlayerListItem = (props: Props) => {
  const { playerName, onEditName } = props;
  const isPlayer = playerName != null;
  return (
    <StyledListItem isPlayer={isPlayer}>
      {isPlayer ? <PersonIcon /> : <ChairIcon />}
      <PlayerName>{isPlayer ? playerName : "Waiting for player..."}</PlayerName>
      {onEditName && (
        <IconButton onClick={onEditName}>
          <BlackEditIcon />
        </IconButton>
      )}
    </StyledListItem>
  );
};
