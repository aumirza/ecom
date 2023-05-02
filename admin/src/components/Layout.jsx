import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Layouts/Header";
import { Sidebar } from "./Layouts/Sidebar";

const SidebarWidth = 180;
// const SidebarWidth = 80;

export const Layout = () => {
  const theme = useTheme();
  return (
    <Box>
      <Sidebar width={SidebarWidth} />
      <Box sx={{ ml: SidebarWidth + "px" }} component="main">
        <Header />
        <Box
          component="section"
          sx={{ pt: 2, background: theme.palette.background.default, p: 5 }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
