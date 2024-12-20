import React from "react";

import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export function User() {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
            size={35}
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              John Doe
            </Text>
            <Text color="dimmed" size="xs">
              john@mail.com
            </Text>
          </Box>

          {theme.dir === "ltr" ? (
            <BiChevronRight size={rem(18)} />
          ) : (
            <BiChevronLeft size={rem(18)} />
          )}
        </Group>
      </UnstyledButton>
    </Box>
  );
}
