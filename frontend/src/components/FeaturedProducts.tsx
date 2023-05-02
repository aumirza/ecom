import React from "react";

export default function FeaturedProducts() {
  return (
    <div className="flex flex-col mt-5 mx-20">
      <h1 className="text-3xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {new Array(10).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-100 h-48 w-48"></div>
        ))}
      </div>
    </div>
  );
}
