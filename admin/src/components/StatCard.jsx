import { Card, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";

export const StatCard = ({ stat }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        background: `linear-gradient(0deg, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 90%)`,
        borderRadius: 2,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" color="white">
          {stat.text}
        </Typography>
        <Typography variant="h4" color="white">
          {stat.value}
        </Typography>
      </CardContent>
    </Card>
  );
};
