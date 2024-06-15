import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="m-4">
      <Outlet />
    </div>
  );
};
