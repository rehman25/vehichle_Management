import React, { useEffect, useState } from "react";
import logo from "../assets/images/sidebar-logo.svg";
import closeIcon from "../assets/images/close-icon.svg";
import dashboardSvg from "../assets/images/dashboard-icon.svg";
import servicesSvg from "../assets/images/services-logo.svg";
import customerSvg from "../assets/images/customer-icon.svg";
import Transfer from "../assets/images/transfer.svg"
import payment from "../assets/images/payment.svg"
import vehicle from "../assets/images/iconmonstr-car-3.svg"
import reportsSvg from "../assets/images/reports-icon.svg";
import itemSvg from '../assets/images/items-icon.svg'
import logoutSvg from "../assets/images/logout-icon.svg";
import downArrow from "../assets/images/dropdown-icon.svg";
import { useLocation, useNavigate } from "react-router";

type SideBarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
const SideBar: React.FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: number]: boolean;
  }>({});

  const handleActive = (route: string) => {
    setActiveMenu(route);
    navigate(route);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const menuItems = [
    { name: "Dashboard", icon: dashboardSvg, route: "/dashboard" },
    { name: "Services", icon: servicesSvg, route: "/services" },
    { name: "Customers", icon: customerSvg, route: "/customers" },
    { name: "Vehicle", icon: vehicle, route: "/Vehicle" },
    { name: "Transfer", icon: Transfer, route: "/TransferVehicle" },
    { name: "Payment & Collection", icon: payment, route: "/PaymentCollections" },
    { name: "Items", icon: itemSvg, route: "/items" },
    // { name: "Sales", icon: salesSvg, route: "/sales" },
    // {
    //   name: "Expenses",
    //   icon: expenseSvg,
    //   route: "",
    //   isDropDown: true,
    //   dropdownItems: [
    //     { name: "Expense", route: "/expense" },
    //     { name: "Expenses Category", route: "/expense-category" },
    //     { name: "Expense Item", route: "/expense-item" },
    //   ],
    // },
    // { name: "Petty Cash", icon: cashSvg, route: "/petty-cash" },
    // { name: "Message Centre", icon: messageSvg, route: "/message-center" },
    // { name: "Inventory", icon: inventorySvg, route: "/inventory" },
    {
      name: "Reports",
      icon: reportsSvg,
      route: "",
      isDropDown: true,
      dropdownItems: [
        { name: "Customer Ledger", route: "/CustomerLedger" },
        { name: "Customer Balance", route: "/CustomerBalanceSummary" },
        { name: "General Transaction", route: "/GeneralTransaction" },
        { name: "Credit Servicing", route: "/credit-servicing" },
      ],
    },
    { name: "Logout", icon: logoutSvg, route: "/" },
  ];

  useEffect(() => {
    const activeRoute = menuItems.find(
      (item) =>
        item.route === location.pathname ||
        (item.isDropDown &&
          item.dropdownItems?.some(
            (dropdownItem) => dropdownItem.route === location.pathname
          ))
    );

    if (activeRoute) {
      setActiveMenu(location.pathname);
      if (activeRoute.isDropDown) {
        const dropdownIndex = menuItems.indexOf(activeRoute);
        setOpenDropdowns((prev) => ({ ...prev, [dropdownIndex]: true }));
      }
    }
  }, [location]);

  return (
    <div
      className={`fixed top-0 left-0 h-full  transition-all duration-300 ${
        isOpen ? "w-[20%]" : "w-0"
      } overflow-y-auto`}
    >
      <div className="flex items-center justify-between px-6">
        <div onClick={() => navigate("/dashboard")} className="cursor-pointer">
          <img className="" src={logo} alt="app-logo" />
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <img src={closeIcon} alt="closeIcon" />
        </div>
      </div>

      <div className="mt-5">
        {isOpen &&
          menuItems.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div
                onClick={() =>
                  item.isDropDown
                    ? toggleDropdown(index)
                    : handleActive(item.route)
                }
                className={`cursor-pointer flex items-center justify-start px-10 py-3 ${
                  activeMenu === item.route ? "bg-secondary" : "bg-transparent"
                }`}
              >
                <div
                  className={`transition-all ${
                    activeMenu === item.route
                      ? "filter invert hue-rotate-90"
                      : ""
                  }`}
                >
                  <img src={item.icon} alt={`${item.name}-icon`} style={{width:"35px", height:"25px"}} />
                </div>

                <span
                  className={`mx-5 text-[14px] ${
                    activeMenu === item.route
                      ? "text-[#ffffff]"
                      : "text-[#000000]"
                  }`}
                >
                  {item.name}
                </span>
                {item.isDropDown && (
                  <div>
                    <img
                      src={downArrow}
                      alt={`downArrow`}
                      className={`transition-transform ${
                        openDropdowns[index] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                )}
              </div>

              {item.isDropDown && openDropdowns[index] && (
                <div className="px-10 my-2">
                  {item.dropdownItems?.map((dropdownItem, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleActive(dropdownItem.route)}
                      className={`cursor-pointer py-2 px-4 ${
                        activeMenu === dropdownItem.route
                          ? "bg-secondary text-[#ffffff]"
                          : "bg-transparent text-[#000000]"
                      }`}
                    >
                      <span className="mx-5 text-[14px]">
                        {dropdownItem.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SideBar;
