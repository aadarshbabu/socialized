import React from "react";

export const Centered = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md p-4 mx-auto">{children}</div>
    </div>
  );
};
