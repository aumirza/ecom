"use client";

import { ProductEditor } from "@/components/admin/ProductEditor";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <ProductEditor id={id} />
    </div>
  );
}
