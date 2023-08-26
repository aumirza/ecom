import Breadcrumb from "@/components/storefront/Breadcrumb";
import Container from "@/components/storefront/ui/Container";
import React, { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="py-5 bg-gray-200">
      <Breadcrumb />

      <Container>{children}</Container>
    </div>
  );
}
