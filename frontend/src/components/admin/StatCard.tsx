import { Paper, Group, RingProgress, Center, Text } from "@mantine/core";
import React from "react";

interface props {
  label: string;
  stats: string;
  progress: number;
  color: string;
  icon: React.ReactNode;
}

const StatCard = ({ label, stats, progress, color, icon }: props) => {
  return (
    <Paper withBorder radius="md" p="xs" key={label}>
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: progress, color: color }]}
          label={<Center>{icon}</Center>}
        />

        <div>
          <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
            {label}
          </Text>
          <Text weight={700} size="xl">
            {stats}
          </Text>
        </div>
      </Group>
    </Paper>
  );
};

export default StatCard;
