import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { sales } from "../data";

export const SalesBarChart = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 2, backgroundColor: "background.paper", borderRadius: 2 }}>
      <Box
        sx={{
          height: 150,
          p: 3,
          background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
          borderRadius: 5,
        }}
      >
        <ResponsiveContainer width="90%">
          <BarChart data={sales} barGap={3} barSize={10} margin="5">
            <YAxis
              tick={{ fill: "white" }}
              // axisLine={{ stroke: "white" }}
              // tickLine={{ stroke: "white" }}
              tickLine={false}
              axisLine={false}
            />
            <XAxis dataKey="month" hide={true} />
            <Tooltip
              labelStyle={{ color: theme.palette.secondary.main }}
              itemStyle={{ color: theme.palette.primary.main }}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="amt"
              fill="white"
              radius={[10, 10, 0, 0]}
              spacing={3}
            />
            {/* <Legend /> */}
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box>
          <Typography variant="h5" color="text.secondary">
            Sales
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>(+ 200%) </span>
            <span>than last month</span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="h5" color="text.secondary">
              $ 2,500
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Sales
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" color="text.secondary">
              $ 1,000
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Profit
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h5" color="text.secondary">
              100
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Orders
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
