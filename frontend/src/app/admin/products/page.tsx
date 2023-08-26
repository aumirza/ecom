import React from "react";
import ProductsTable from "@/components/admin/ProductsTable";

const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/products");
  const data = await response.json();
  return data.products;
};

async function Page() {
  const products = await fetchProducts();

  return <ProductsTable products={products} />;
}

export default Page;
