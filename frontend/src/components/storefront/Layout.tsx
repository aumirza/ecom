import React, { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="">{children}</main>
    </>
  );
}
