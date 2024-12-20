import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddTocart from "./AddTocart";

function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-center">
            <Image
              className="rounded-t-lg p-8"
              src={product.image}
              alt={product.name}
              width={250}
              height={250}
            />
          </div>

          <div className="px-5 pb-5">
            <h3 className="text-gray-900 font-semibold text-lg tracking-tight dark:text-white">
              {product.name}
            </h3>
            <div className="flex items-center mt-2.5 mb-5">
              {new Array(5).fill(0).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}

              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                5.0
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {product.price}
              </span>
              <AddTocart product={product} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
