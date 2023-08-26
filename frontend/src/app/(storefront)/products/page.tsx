import ProductCard from "@/components/storefront/ProductCard";
import React from "react";

export const metadata = {
  title: "Products",
  description: "All products",
};

async function fetchProducts() {
  const res = await fetch("http://localhost:5000/products");
  const data = await res.json();
  return data.products;
}

async function Page() {
  const products = await fetchProducts();

  return (
    <div className="flex flex-col mt-5 mx-10">
      <h1 className="text-3xl">Products</h1>
      <div className="flex">
        <div className="w-64 h-screen"></div>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-3">
          {products && products.length
            ? products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default Page;
