import React, { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {children}
    </div>
  );
}
