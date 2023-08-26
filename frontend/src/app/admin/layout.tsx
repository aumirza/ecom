"use client";

import {
  AppShell,
  // Footer,
  // Aside,
  useMantineTheme,
} from "@mantine/core";
import { PropsWithChildren, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import AdminProviders from "@/components/admin/AdminProviders";

function App({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
  const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Sidebar sidebarOpened={sidebarOpened} />}
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      header={
        <Header
          sidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
        />
      }
    >
      {children}
    </AppShell>
  );
}

export default function AppWithProviders({ children }: PropsWithChildren) {
  return (
    <AdminProviders>
      <App>{children}</App>
    </AdminProviders>
  );
}
