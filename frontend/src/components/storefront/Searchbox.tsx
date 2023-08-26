import React from "react";

export default function Searchbox() {
  return (
    <div className="relative">
      <input
        type="search"
        className="pl-10 pr-2 h-10 py-1 rounded-lg border 0border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none"
        placeholder="Search"
      />
      <svg
        className="h-6 w-6 text-gray-300 ml-2 mt-2 stroke-current absolute top-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
