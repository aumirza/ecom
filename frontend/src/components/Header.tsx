import React from "react";
import ActiveLink from "./ActiveLink";

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <ActiveLink
    activeClassName="border-b-2 border-purple-600"
    className="mr-4 hover:border-b-2 hover:border-purple-600"
    href={href}
  >
    {children}
  </ActiveLink>
);

export default function Header() {
  return (
    <div className="flex justify-between items-center px-5 h-16">
      <h1 className="text-2xl">Ecom</h1>
      <div className="flex items-center">
        <ul className="flex">
          <li>
            <LinkItem href="/">Home</LinkItem>
          </li>
          <li>
            <LinkItem href="/products">Products</LinkItem>
          </li>
          <li>
            <LinkItem href="/home-and-kitchen">Home And Kitchen</LinkItem>
          </li>
          <li>
            <LinkItem href="/cart">Cart</LinkItem>
          </li>
        </ul>
        <div className="flex mr-4">
          <button className="p-2 px-4 bg-purple-600 text-white rounded-full">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
