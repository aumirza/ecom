import React from "react";
import Image from "next/image";
import marketPlaceIcon from "../assets/marketplace.png";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-around h-96 bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Welcome to Ecom</h1>
        <p className="mt-4">
          The best place to buy your favorite products at the best price.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={marketPlaceIcon}
          width={300}
          height={300}
          alt="marketplace"
        />
      </div>
    </div>
  );
}
