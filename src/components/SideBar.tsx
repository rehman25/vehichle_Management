import React, { useState } from "react";
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

type SideBarProps = {};
const SideBar: React.FC<SideBarProps> = () => {
  const [activeMenu, setActiveMenu] = useState<number>(0);

  const handleActive = (index: number) => {
    setActiveMenu(index);
  };

  const menuItems = [
    { name: "Dashboard", icon: dashboardSvg, route: "" },
    { name: "Services", icon: servicesSvg, route: "" },
    { name: "Customers", icon: customerSvg, route: "" },
    { name: "Items", icon: itemsSvg, route: "" },
    { name: "Sales", icon: salesSvg, route: "" },
    { name: "Expenses", icon: expenseSvg, route: "", isDropDown: true },
    { name: "Petty Cash", icon: cashSvg, route: "" },
    { name: "Message Centre", icon: messageSvg, route: "" },
    { name: "Inventory", icon: inventorySvg, route: "" },
    { name: "Reports", icon: reportsSvg, route: "", isDropDown: true },
    { name: "Logout", icon: logoutSvg, route: "" },
  ];
  return (
    <div className="w-[28%]">
      <div className="flex items-center justify-between mt-10 px-10">
        <div className="cursor-pointer">
          <img className="" src={logo} alt="app-logo" />
        </div>
        <div className="cursor-pointer">
          <img src={closeIcon} alt="closeIcon" />
        </div>
      </div>

      <div className="mt-5">
        {menuItems.map((item, index) => (
          <div
            onClick={() => handleActive(index)}
            key={index}
            className={`cursor-pointer flex items-center justify-start px-10 py-3 ${
              activeMenu === index ? "bg-secondary" : "bg-transparent"
            }`}
          >
            <img src={item.icon} alt={`${item.name}-icon`} />
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
