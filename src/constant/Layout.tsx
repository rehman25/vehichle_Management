import React, { useState } from "react";
import SideBar from "../components/SideBar";
import MenuIcon from "../assets/images/burger-menu.svg";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  console.log(isOpen, "isOpen");
  return (
    <div className="flex h-screen">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`transition-all duration-300 ${
          isOpen ? "ml-[18%]" : "ml-0"
        } flex-1 p-10 overflow-auto`}
      >
        {!isOpen && (
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <img className="h-10 w-10" src={MenuIcon} alt="MenuIcon" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;
