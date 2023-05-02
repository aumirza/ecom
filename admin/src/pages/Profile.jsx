import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const DetailsBox = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 1 }}>
        <Typography sx={{ fontWeight: "bold", mb: -0.8 }} variant="h5">
          John Doe
        </Typography>
        <Typography variant="body1"> Project Manager </Typography>
      </Box>
    </Box>
  );
};

export const CoverImage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 250,
      }}
    >
      <img
        style={{ height: "100%", width: "100%" }}
        src="https://picsum.photos/700"
        alt="cover"
      />
    </Box>
  );
};

export const ProfileImage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: -75,
        border: "5px solid ",
        borderColor: "primary.main",
        borderRadius: "50%",
        overflow: "hidden",
        width: 150,
        height: 150,
      }}
    >
      <img
        style={{ height: "100%", width: "100%" }}
        src="https://picsum.photos/200"
        alt="profile"
      />
    </Box>
  );
};

export const Profile = () => {
  return (
    <Paper>
      <Box
        sx={{ position: "relative", display: "flex", justifyContent: "center" }}
      >
        <CoverImage />
        <ProfileImage />
      </Box>

      <DetailsBox />
    </Paper>
  );
};
