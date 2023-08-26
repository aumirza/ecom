"use client";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { AiOutlineDelete } from "react-icons/ai";
import { BsDash, BsPlus } from "react-icons/bs";

export default function AddToCartWithQuantity({ product }: any) {
  const { addToCart, inCart, removeFromCart } = useCart();

  const [quantityToAdd, setQuantityToAdd] = useState(1);

  const handleIncrementInCart = () => {
    addToCart(product);
  };

  const handleAddToCart = () => {
    addToCart(product, quantityToAdd);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };

  return inCart(product).quantity ? (
    <div className="custom-number-input h-16 w-32 mt-5">
      <label
        htmlFor="quantity"
        className="w-full text-gray-700 text-lg font-semibold"
      >
        Quantity
      </label>
      <div className="flex flex-row h-16 w-full rounded-lg relative bg-transparent mt-1">
        <button
          onClick={handleRemoveFromCart}
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">
            {inCart(product).quantity === 1 ? (
              <AiOutlineDelete className="mx-auto" />
            ) : (
              <BsDash className="mx-auto" />
            )}
          </span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700"
          name="quantity"
          value={inCart(product).quantity}
        ></input>
        <button
          onClick={handleIncrementInCart}
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">
            <BsPlus className="mx-auto" />
          </span>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex py-4 space-x-4">
      <div className="relative">
        <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
          Qty
        </div>
        <select
          className="cursor-pointer appearance-none rounded-lg border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
          value={quantityToAdd}
          onChange={(e) => setQuantityToAdd(parseInt(e.target.value))}
        >
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <HiChevronUpDown className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2 pointer-events-none" />
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
      >
        Add to Cart
      </button>
    </div>
  );
}
