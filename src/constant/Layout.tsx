import React, { useState } from "react";
import SideBar from "../components/SideBar";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex pt-10">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={` ${isOpen ? "w-[74%]" : "w-full"}`}>{children}</div>
    </div>
  );
};

export default Layout;
