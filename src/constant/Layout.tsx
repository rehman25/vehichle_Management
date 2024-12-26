import React from "react";
import SideBar from "../components/SideBar";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
