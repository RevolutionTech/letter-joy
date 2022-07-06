import {
  styled,
  Button as MUIButton,
  TextField as MUITextField,
} from "@mui/material";

import theme from "../theme";

export const Button = styled(MUIButton)({ fontFamily: theme.fontFamily });
export const TextField = styled(MUITextField)({
  width: "100%",
  marginTop: "16px",

  "& input.MuiInputBase-input": { padding: "16px" },
});
