import React from "react";

import TopNav from "../components/header/TopNav";

const MainLayout = ({ children }) => {
  // Don't show TopNav on login page
  const isLoginPage = window.location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <TopNav />}
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
