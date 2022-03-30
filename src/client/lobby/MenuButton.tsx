import { Link } from "react-router-dom";
import { Button, ButtonProps } from "@mui/material";

interface Props extends ButtonProps<"a"> {
  to: string;
}

export const MenuButton = (props: Props) => (
  <Button
    component={Link}
    size="large"
    style={{ width: "296px", height: "72px", marginBottom: "16px" }}
    {...props}
  />
);
