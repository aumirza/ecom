import { Navbar, ScrollArea } from "@mantine/core";
import Nav from "./Nav";
import { User } from "./User";

export default function Sidebar({ sidebarOpened }: { sidebarOpened: boolean }) {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!sidebarOpened}
      width={{ sm: 240, lg: 300 }}
    >
      <Navbar.Section mt="xs">{/* Header with logo */}</Navbar.Section>

      <Navbar.Section grow component={ScrollArea} mx="-xs">
        <Nav />
      </Navbar.Section>

      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
}
