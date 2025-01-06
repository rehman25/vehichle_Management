import React, { useEffect, useState } from "react";
import logo from "../assets/images/sidebar-logo.svg";
import closeIcon from "../assets/images/close-icon.svg";
import dashboardSvg from "../assets/images/dashboard-icon.svg";
import servicesSvg from "../assets/images/services-logo.svg";
import customerSvg from "../assets/images/customer-icon.svg";
import itemsSvg from "../assets/images/items-icon.svg";
import salesSvg from "../assets/images/sales-icon.svg";
import expenseSvg from "../assets/images/expense-icon.svg";
import cashSvg from "../assets/images/cash-icon.svg";
import messageSvg from "../assets/images/message-icon.svg";
import inventorySvg from "../assets/images/inventory-icon.svg";
import reportsSvg from "../assets/images/reports-icon.svg";
import logoutSvg from "../assets/images/logout-icon.svg";
import downArrow from "../assets/images/dropdown-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";

type SideBarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const SideBar: React.FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const handleActive = (index: number, route: string) => {
    setActiveMenu(index);
    navigate(route);
  };

  const menuItems = [
    { name: "Dashboard", icon: dashboardSvg, route: "/dashboard" },
    { name: "Services", icon: servicesSvg, route: "/services" },
    { name: "Customers", icon: customerSvg, route: "/customers" },
    { name: "Items", icon: itemsSvg, route: "/items" },
    { name: "Sales", icon: salesSvg, route: "" },
    { name: "Expenses", icon: expenseSvg, route: "", isDropDown: true },
    { name: "Petty Cash", icon: cashSvg, route: "" },
    { name: "Message Centre", icon: messageSvg, route: "" },
    { name: "Inventory", icon: inventorySvg, route: "" },
    { name: "Reports", icon: reportsSvg, route: "", isDropDown: true },
    { name: "Logout", icon: logoutSvg, route: "" },
  ];

  useEffect(() => {
    const activeRoute = menuItems.findIndex(
      (item) => item.route === location.pathname
    );
    setActiveMenu(activeRoute !== -1 ? activeRoute : 0);
  }, [location]);

  return (
    <div
    className={`fixed top-0 left-0 h-full  transition-all duration-300 ${
      isOpen ? "w-[18%]" : "w-0"
    } overflow-y-auto`}
    >
      <div className="flex items-center justify-between px-10">
        <div onClick={()=>navigate("/dashboard")} className="cursor-pointer">
          <img className="" src={logo} alt="app-logo" />
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <img src={closeIcon} alt="closeIcon" />
        </div>
      </div>

      <div className="mt-5">
        {isOpen &&
          menuItems.map((item, index) => (
            <div
              onClick={() => handleActive(index, item.route)}
              key={index}
              className={`cursor-pointer flex items-center justify-start px-10 py-3 ${
                activeMenu === index ? "bg-secondary" : "bg-transparent"
              }`}
            >
              <div
                className={`transition-all ${
                  activeMenu === index ? "filter invert hue-rotate-90" : ""
                }`}
              >
                <img src={item.icon} alt={`${item.name}-icon`} />
              </div>

              <span
                className={`mx-5 text-[18px] ${
                  activeMenu === index ? "text-[#ffffff]" : "text-[#000000]"
                }`}
              >
                {item.name}
              </span>
              {item.isDropDown && (
                <div>
                  <img src={downArrow} alt={`downArrow`} />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SideBar;
