"use client";
import { useCart } from "@/contexts/CartContext";
import React from "react";

export default function AddTocart({ product }: { product: IProduct }) {
  const { addToCart, inCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={inCart(product).quantity ? true : false}
      onClick={handleAddToCart}
    >
      {inCart(product).quantity ? "In cart" : "Add to cart"}
    </button>
  );
}
