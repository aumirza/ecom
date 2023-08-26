import React, { PropsWithChildren } from "react";
import CartContextProvider from "@/contexts/CartContext";

export default function StoreFrontProviders({ children }: PropsWithChildren) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
