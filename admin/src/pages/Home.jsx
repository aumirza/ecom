import { Box, Grid } from "@mui/material";
import React from "react";
import { SalesBarChart } from "../components/SalesBarChart";
import { SalesLineChart } from "../components/SalesLineChart";
import { StatCard } from "../components/StatCard";

const statCards = [
  {
    text: "Total Sales Amount",
    value: 100,
  },
  {
    text: "Total Sales",
    value: 100,
  },
  {
    text: "New Customers",
    value: 100,
  },
  {
    text: "Total Customers",
    value: 100,
  },
];

export const Home = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {statCards.map((stat) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={stat.text}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>

      <Grid sx={{ pt: 2 }} container spacing={2}>
        <Grid item xs={12} sm={6} md={5}>
          <SalesBarChart />
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <SalesLineChart />
        </Grid>
      </Grid>
    </Box>
  );
};
