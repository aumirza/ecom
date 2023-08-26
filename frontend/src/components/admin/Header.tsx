import React from "react";
import {
  Header as AppShellHeader,
  Text,
  MediaQuery,
  Burger,
  Group,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { ThemeToggle } from "@/components/admin/ThemeToggle";

interface props {
  sidebarOpened: boolean;
  setSidebarOpened: (sidebarOpened: boolean) => void;
}

export default function Header({ sidebarOpened, setSidebarOpened }: props) {
  const theme = useMantineTheme();
  return (
    <AppShellHeader height={{ base: 50, md: 70 }} p="md">
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={sidebarOpened}
          onClick={() => setSidebarOpened(!sidebarOpened)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      </MediaQuery>

      <Box>
        <Group position="apart">
          <Text
            size="xl"
            weight={700}
            component="h1"
            color={
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black
            }
          >
            Ecom
          </Text>
          <ThemeToggle />
        </Group>
      </Box>
    </AppShellHeader>
  );
}
