"use client";
import { ProductEditor } from "@/components/admin/ProductEditor";
import { Group, Paper, TextInput } from "@mantine/core";
import React from "react";

export default function page() {
  return (
    <Paper withBorder radius="md" p="xs">
      <ProductEditor />
    </Paper>
  );
}
