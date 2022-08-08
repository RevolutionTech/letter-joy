import { useState } from "react";
import { styled, Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";

import theme from "../../theme";
import { HelpContent } from "./HelpContent";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  [theme.mediaLg]: {
    width: "50%",
  },
  maxHeight: "80%",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  outline: 0,
  boxShadow: 24,
  p: 4,
};

const HelpButton = styled(IconButton)({ float: "right", marginLeft: "8px" });
const CloseButton = styled(IconButton)({
  alignSelf: "flex-end",
});

export const FloatingHelpButton = () => {
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  return (
    <>
      <HelpButton onClick={() => setIsHelpOpen(true)}>
        <HelpIcon />
      </HelpButton>
      <Modal open={isHelpOpen} onClose={() => setIsHelpOpen(false)}>
        <Box sx={modalStyle}>
          <CloseButton onClick={() => setIsHelpOpen(false)}>
            <CloseIcon />
          </CloseButton>
          <HelpContent />
        </Box>
      </Modal>
    </>
  );
};
