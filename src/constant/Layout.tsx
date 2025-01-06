import React, { useState } from "react";
import SideBar from "../components/SideBar";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`transition-all duration-300 ${
          isOpen ? "ml-[18%]" : "ml-0"
        } flex-1 p-10 overflow-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
