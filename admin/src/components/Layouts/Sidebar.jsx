import { Divider, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Nav } from "./Nav";

export const Sidebar = ({ width }) => {
  return (
    <Drawer
      container="aside"
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: width, bgcolor: "primary.main" },
      }}
      variant="permanent"
      anchor="left"
      open={true}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 64,
            bgcolor: "primary.dark",
          }}
        >
          <Typography fontFamily="monospace" variant="h4" color="white">
            Dashy
          </Typography>
        </Box>
        <Divider />
        <Nav />
      </Box>
    </Drawer>
  );
};
