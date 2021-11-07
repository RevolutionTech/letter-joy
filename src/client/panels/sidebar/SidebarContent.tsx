import React from "react";
import { styled } from "@mui/material";

const SidebarHeaderText = styled("div")({ flexGrow: 1, fontSize: "18pt" });
const ButtonList = styled("div")({ display: "flex", flexDirection: "column" });

interface Props {
  header: string;
  buttons: React.ReactElement[];
  children: React.ReactNode;
}

export const SidebarContent = (props: Props) => {
  const { header, buttons, children } = props;
  return (
    <>
      <div style={{ display: "flex" }}>
        <SidebarHeaderText>{header}</SidebarHeaderText>
        <ButtonList>{buttons}</ButtonList>
      </div>
      {children}
    </>
  );
};
