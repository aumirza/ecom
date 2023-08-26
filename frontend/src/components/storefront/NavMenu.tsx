import React from "react";
import ActiveLink from "./ActiveLink";

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <ActiveLink
      activeClassName="bg-gray-100 text-gray-600"
      className="px-2 py-2 rounded-lg text-gray-400 hover:bg-gray-100  hover:text-gray-600"
      href={href}
    >
      {children}
    </ActiveLink>
  );
};

export default function NavMenu() {
  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/home-and-kitchen-1", label: "Home And Kitchen" },
    { href: "/fashion", label: "Fashion" },
    { href: "/xyz", label: "More" },
  ];

  return (
    <>
      <button
        type="button"
        className="md:hidden w-10 h-10 rounded-lg -ml-2 flex justify-center items-center"
      >
        <svg
          className="text-gray-500 w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <a href="#" className="font-bold text-gray-700 text-2xl">
        Ecom.
      </a>

      <div className="hidden md:flex space-x-3 flex-1 lg:ml-8">
        {navLinks.map(({ href, label }) => (
          <LinkItem key={href} href={href}>
            {label}
          </LinkItem>
        ))}
      </div>
    </>
  );
}
