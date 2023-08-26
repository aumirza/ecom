import React from "react";
import Searchbox from "./Searchbox";
import CartButton from "./CartButton";
import NavMenu from "./NavMenu";
import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-white shadow-sm sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <NavMenu />

          <div className="flex items-center space-x-4">
            <Searchbox />
            <CartButton />

            <button
              type="button"
              className="hidden md:block w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex justify-center items-center"
            >
              <img
                src="https://avatars.dicebear.com/api/bottts/2.svg"
                alt="bottts"
                width="28"
                height="28"
                className="rounded-lg mx-auto"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
