import React from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "../Components/MyNavbar";

function Layout() {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
}

export default Layout;
