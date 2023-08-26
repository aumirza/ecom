"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Divider, Flex, NavLink } from "@mantine/core";
import {
  BiCart,
  BiCog,
  BiHome,
  BiLabel,
  BiPlus,
  BiUser,
  BiListUl,
} from "react-icons/bi";
import Link from "next/link";

interface navLinkData {
  label: string;
  description?: string;
  href: string;
  rightSection?: React.ReactNode;
  icon: React.ComponentType<any>;
  children?: navLinkData[];
}

interface navLink extends Omit<navLinkData, "icon" | "children"> {
  icon: React.ReactNode;
}

function ActiveNavLink({
  href,
  label,
  description,
  icon,
  rightSection,
  children,
}: PropsWithChildren<navLink>) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const linkPathname = new URL(href, window.location.href).pathname;
    const activePathname = new URL(pathname, window.location.href).pathname;

    setIsExpanded(activePathname.includes(linkPathname));
    setIsActive(linkPathname === activePathname);
  }, [href, pathname]);

  return children ? (
    <NavLink
      defaultOpened={isExpanded}
      label={label}
      {...(description && { description })}
      {...(rightSection && { rightSection })}
      icon={icon}
    >
      {children}
    </NavLink>
  ) : (
    <Link href={href}>
      <NavLink
        active={isActive}
        label={label}
        {...(description && { description })}
        {...(rightSection && { rightSection })}
        icon={icon}
      />
    </Link>
  );
}

const navLinks: navLinkData[][] = [
  [
    {
      label: "Home",
      href: "/dashboard",
      icon: BiHome,
    },
    {
      label: "Products",
      href: "/products",
      icon: BiCart,
      children: [
        {
          label: "All Products",
          href: "/products",
          icon: BiListUl,
        },
        {
          label: "Add Product",
          href: "/products/add",
          icon: BiPlus,
        },
      ],
    },
    {
      label: "Categories",
      href: "/categories",
      icon: BiLabel,
    },
  ],
  [
    {
      label: "Profile",
      href: "/profile",
      icon: BiUser,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: BiCog,
    },
  ],
];

export default function Nav() {
  return (
    <>
      {navLinks.map((navLinks) => (
        <Flex key={navLinks[0].href} direction="column">
          {navLinks.map((navLink) => (
            <ActiveNavLink
              key={navLink.href}
              href={"/admin" + navLink.href}
              label={navLink.label}
              description={navLink.description}
              icon={
                <navLink.icon
                  size={navLink.description ? "1.8rem" : "1.5rem"}
                />
              }
            >
              {navLink.children
                ? navLink.children.map((navLink) => (
                    <ActiveNavLink
                      key={navLink.href}
                      href={"/admin" + navLink.href}
                      label={navLink.label}
                      description={navLink.description}
                      icon={
                        <navLink.icon
                          size={navLink.description ? "1.8rem" : "1.5rem"}
                        />
                      }
                    />
                  ))
                : null}
            </ActiveNavLink>
          ))}
          <Divider my="sm" />
        </Flex>
      ))}
    </>
  );
}
