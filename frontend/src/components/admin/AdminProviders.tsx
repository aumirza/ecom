"use client";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useEmotionCache,
} from "@mantine/core";
import { CacheProvider } from "@emotion/react";
import { Notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";

interface props {
  children: React.ReactNode;
}

function AdminProviders({ children }: props) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <CacheProvider value={cache}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
          }}
        >
          <Notifications />
          {children}
        </MantineProvider>
      </CacheProvider>
    </ColorSchemeProvider>
  );
}

export default AdminProviders;
