"use client";
import {
  Switch,
  Group,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { BiSun } from "react-icons/bi";
import { BsMoonStars } from "react-icons/bs";

export function ThemeToggle() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Group position="center">
      <Switch
        size="md"
        color={theme.colorScheme === "dark" ? "gray" : "dark"}
        onLabel={<BiSun size="1rem" color={theme.colors.yellow[4]} />}
        offLabel={<BsMoonStars size="1rem" color={theme.colors.blue[6]} />}
        checked={colorScheme === "dark"}
        onChange={() => toggleColorScheme()}
      />
    </Group>
  );
}
