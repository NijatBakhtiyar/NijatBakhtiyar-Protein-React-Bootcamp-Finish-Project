import React from "react";

import Header from "./Header";

function UserLayout({ children }) {
  return (
    <div className="user-layout">
      <Header />
      <div className="container-md">{children}</div>
    </div>
  );
}

export default UserLayout;
