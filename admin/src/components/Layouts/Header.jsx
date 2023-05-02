import { Box } from "@mui/material";
import React from "react";
import { BreadCrumb } from "../Breadcrumb";

export const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        px: 2,
        display: "flex",
        alignItems: "center",
        bgcolor: "primary.main",
        height: 64,
      }}
    >
      <BreadCrumb />
    </Box>
  );
};
