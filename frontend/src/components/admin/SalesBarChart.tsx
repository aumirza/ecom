import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Paper, Text, useMantineTheme } from "@mantine/core";
import { sales } from "@/data";

export const SalesBarChart = () => {
  const theme = useMantineTheme();
  return (
    <Paper
      sx={{
        padding: 20,
        borderRadius: 10,
      }}
    >
      <Box
        sx={{
          height: 150,
          padding: 10,
          background: `linear-gradient(45deg, ${theme.colors.blue[5]} 30%, ${theme.primaryColor} 90%)`,
          borderRadius: 10,
        }}
      >
        <ResponsiveContainer width="90%">
          <BarChart
            data={sales}
            barGap={3}
            barSize={10}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <YAxis
              tick={{
                fill:
                  theme.colorScheme == "dark"
                    ? theme.colors.gray[2]
                    : theme.white,
              }}
              // axisLine={{ stroke: "white" }}
              // tickLine={{ stroke: "white" }}
              tickLine={false}
              axisLine={false}
            />
            <XAxis dataKey="month" hide={true} />
            <Tooltip
              labelStyle={{ color: theme.primaryColor }}
              itemStyle={{ color: theme.primaryColor }}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="amt"
              fill={
                theme.colorScheme == "dark" ? theme.colors.gray[2] : theme.white
              }
              radius={[10, 10, 0, 0]}
              spacing={3}
            />
            {/* <Legend /> */}
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ padding: 10 }}>
        <Box>
          <Text fz="xl">Sales</Text>
          <Text fz="sm">
            <span style={{ fontWeight: "bold" }}>(+ 200%) </span>
            <span>than last month</span>
          </Text>
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
            <Text fz="xl">$ 10,000</Text>
            <Text fz="sm">Total Sales</Text>
          </Box>
          <Box>
            <Text fz="xl">$ 10,000</Text>
            <Text fz="sm">Total Sales</Text>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Text fz="xl">$ 10,000</Text>
            <Text fz="sm">Total Sales</Text>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
