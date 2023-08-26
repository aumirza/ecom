"use client";
import React from "react";
import { Grid, SimpleGrid } from "@mantine/core";
import { BiCart } from "react-icons/bi";
import StatCard from "@/components/admin/StatCard";
import { SalesBarChart } from "@/components/admin/SalesBarChart";
import { SalesLineChart } from "@/components/admin/SalesLineChart";

function page() {
  return (
    <div>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <StatCard
          label="Total Products"
          stats="100"
          progress={100}
          color="blue"
          icon={<BiCart />}
        />
        <StatCard
          label="Total Products"
          stats="100"
          progress={100}
          color="blue"
          icon={<BiCart />}
        />
        <StatCard
          label="Total Products"
          stats="100"
          progress={100}
          color="blue"
          icon={<BiCart />}
        />
      </SimpleGrid>
      <Grid sx={{ marginTop: "2rem" }}>
        <Grid.Col span={4}>
          <SalesBarChart />
        </Grid.Col>
        <Grid.Col span={8}>
          <SalesLineChart />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default page;
