"use client";

import Link from "next/link";
import React from "react";

function error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen fixed top-0 w-full">
      <h1 className="text-6xl font-bold">404</h1>
      <div className="flex text-2xl space-x-1">
        <p>You should not be seeing this page. Go to </p>
        <Link href="/" className="underline">
          home
        </Link>
      </div>
    </div>
  );
}

export default error;
