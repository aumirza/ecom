import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { allSales } from "../data";

export const SalesLineChart = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 5, backgroundColor: "background.paper", borderRadius: 2 }}>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={allSales}>
          <YAxis />
          <XAxis dataKey="month" />

          {/* shading below line */}
          <defs>
            <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0.5}
              />
              <stop
                offset="50%"
                stopColor={theme.palette.primary.main}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="gradSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.palette.secondary.main}
                stopOpacity={0.5}
              />
              <stop
                offset="50%"
                stopColor={theme.palette.secondary.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Tooltip />
          <CartesianGrid vertical={false} strokeDasharray="3 5" />
          <Line
            type="monotone"
            dataKey="previousYear"
            name={new Date().getFullYear() - 1}
            strokeWidth={3}
            // legendType="none"
            dot={false}
            fillOpacity={1}
            stroke={theme.palette.primary.main}
          />
          <Line
            type="monotone"
            dataKey="currentYear"
            name={new Date().getFullYear()}
            strokeWidth={3}
            // legendType="none"
            dot={false}
            fillOpacity={1}
            stroke={theme.palette.secondary.main}
          />
          <Area
            tooltipType="none"
            type="monotone"
            fillOpacity={1}
            stroke={false}
            strokeWidth={3}
            dataKey="previousYear"
            fill="url(#gradPrimary)"
          />
          <Area
            tooltipType="none"
            type="monotone"
            fillOpacity={1}
            // stroke={false}
            strokeWidth={3}
            dataKey="currentYear"
            fill="url(#gradSecondary)"
          />
          <Brush
            dataKey="month"
            height={30}
            stroke={theme.palette.primary.main}
            fill="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};
