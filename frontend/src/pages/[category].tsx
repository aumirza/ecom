import { useRouter } from "next/router";
import React from "react";

function category() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="flex flex-col mt-5 mx-10">
      <h1 className="text-3xl">Category: {category}</h1>

      <div className="flex">
        <div className="w-64 h-screen"></div>

        <div className="grid grid-cols-4 gap-4">
          {new Array(10).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-100 h-48 w-48"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default category;
