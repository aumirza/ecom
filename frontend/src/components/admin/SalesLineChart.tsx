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
import { Box, Paper, rem, useMantineTheme } from "@mantine/core";
import { allSales } from "@/data";

export const SalesLineChart = () => {
  const theme = useMantineTheme();
  return (
    <Paper sx={{ padding: rem(20), borderRadius: rem(10) }}>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={allSales}>
          <YAxis />
          <XAxis dataKey="month" />

          {/* shading below line */}
          <defs>
            <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.primaryColor}
                stopOpacity={0.5}
              />
              <stop
                offset="50%"
                stopColor={theme.primaryColor}
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="gradSecondary" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={theme.colors.grape[6]}
                stopOpacity={0.5}
              />
              <stop
                offset="50%"
                stopColor={theme.colors.grape[6]}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Tooltip />
          <CartesianGrid vertical={false} strokeDasharray="3 5" />
          <Line
            type="monotone"
            dataKey="previousYear"
            name={(new Date().getFullYear() - 1).toString()}
            strokeWidth={3}
            // legendType="none"
            dot={false}
            fillOpacity={1}
            stroke={theme.primaryColor}
          />
          <Line
            type="monotone"
            dataKey="currentYear"
            name={new Date().getFullYear().toString()}
            strokeWidth={3}
            // legendType="none"
            dot={false}
            fillOpacity={1}
            stroke={theme.primaryColor}
          />
          <Area
            tooltipType="none"
            type="monotone"
            fillOpacity={1}
            // stroke={false}
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
            stroke={theme.primaryColor}
            fill="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Paper>
  );
};
