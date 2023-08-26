import CategoriesTable from "@/components/admin/CategoriesTable";
import React from "react";

const fetchCategories = async () => {
  const response = await fetch("http://localhost:5000/categories");
  const data = await response.json();
  return data.categories;
};

export default async function page() {
  const categories = await fetchCategories();

  return <CategoriesTable categories={categories} />;
}
