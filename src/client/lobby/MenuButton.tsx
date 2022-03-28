import { Link } from "react-router-dom";
import { Button } from "@mui/material";

// TODO: Inherit from MUI ButtonProps
interface Props {
  to: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "text" | "outlined" | "contained";
}

export const MenuButton = (props: React.PropsWithChildren<Props>) => (
  <Button
    component={Link}
    size="large"
    style={{ width: "296px", height: "72px", marginBottom: "16px" }}
    {...props}
  />
);
