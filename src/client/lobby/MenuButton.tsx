import { Link } from "react-router-dom";
import { Button, ButtonProps } from "@mui/material";

import { LARGE_BUTTON_STYLES } from "./largeButton";

interface Props extends ButtonProps<"a"> {
  to: string;
}

export const MenuButton = (props: Props) => (
  <Button
    component={Link}
    style={LARGE_BUTTON_STYLES} // Cannot provide styles to styled() because TS complains
    {...props}
  />
);
