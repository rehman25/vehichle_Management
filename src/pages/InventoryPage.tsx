import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import Pagination from "../components/Pagination";
import EditableTable from "../components/EditableTable";

const InventoryPage = () => {
  const [inventoryTab, setInventoryTab] = useState<String>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const headers = [
    "Item Name",
    "Date",
    "Quantity",
    "Price Per Piece",
    "Total Price",
    "Description",
  ];

  const inventoryHeaders = [
    "Item Name",
    "Quantity",
    "Price Per Piece",
    "Total Price",
  ];

  const data = [
    {
      "Item Name": "Brake Fluid",
      Date: "2025-01-01",
      Quantity: 2,
      "Price Per Piece": 15,
      "Total Price": 30,
      Description: "High-quality brake fluid for optimal braking performance.",
    },
    {
      "Item Name": "Air Filter",
      Date: "2025-01-02",
      Quantity: 1,
      "Price Per Piece": 20,
      "Total Price": 20,
      Description: "Durable air filter to improve engine efficiency.",
    },
    {
      "Item Name": "Coolant",
      Date: "2025-01-03",
      Quantity: 3,
      "Price Per Piece": 10,
      "Total Price": 30,
      Description: "Premium coolant for engine temperature regulation.",
    },
    {
      "Item Name": "Engine Oil",
      Date: "2025-01-04",
      Quantity: 1,
      "Price Per Piece": 40,
      "Total Price": 40,
      Description: "Synthetic engine oil for enhanced performance.",
    },
    {
      "Item Name": "Spark Plug",
      Date: "2025-01-05",
      Quantity: 4,
      "Price Per Piece": 8,
      "Total Price": 32,
      Description: "Reliable spark plugs for efficient ignition.",
    },
  ];

  const inventoryData = [
    {
      "Item Name": "Brake Fluid",
      Quantity: 2,
      "Price Per Piece": 15,
      "Total Price": 30,
    },
    {
      "Item Name": "Air Filter",
      Quantity: 1,
      "Price Per Piece": 20,
      "Total Price": 20,
    },
    {
      "Item Name": "Coolant",
      Quantity: 3,
      "Price Per Piece": 10,
      "Total Price": 30,
    },
    {
      "Item Name": "Engine Oil",
      Quantity: 1,
      "Price Per Piece": 40,
      "Total Price": 40,
    },
  ];

  return (
    <Layout>
      {inventoryTab === "IN" && (
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Inventory In
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setInventoryTab("")}
                className="flex items-center gap-4 bg-primary rounded-[10px] p-4 cursor-pointer py-3 px-4"
              >
                <img src={arrowIcon} alt="arrowIcon-Icon" />
                <span className="text-[16px] text-white">Back</span>
              </button>
              <button className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
                <img src={saveIcon} alt="save-Icon" />
                <span className="text-[16px] text-white">Save</span>
              </button>
            </div>
          </div>

          <EditableTable
            headers={inventoryHeaders}
            data={inventoryData}
          />
        </div>
      )}
      {inventoryTab === "OUT" && (
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Inventory Out
            </p>
            <div className="flex items-center gap-4">
              <button
               onClick={() => setInventoryTab("")}
                className="flex items-center gap-4 bg-primary rounded-[10px] p-4 cursor-pointer py-3 px-4"
              >
                <img src={arrowIcon} alt="arrowIcon-Icon" />
                <span className="text-[16px] text-white">Back</span>
              </button>
              <button className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
                <img src={saveIcon} alt="save-Icon" />
                <span className="text-[16px] text-white">Save</span>
              </button>
            </div>
          </div>

          <EditableTable
            headers={inventoryHeaders}
            data={inventoryData}
          />
        </div>
      )}
      {inventoryTab !== "IN" && inventoryTab !== "OUT" && (
        <div>
          <LayoutHeader
            titleName={"Inventory"}
            removeBtn={true}
          />
          <div className="flex justify-end items-center gap-4">
            <div
             onClick={() => setInventoryTab("IN")}
              className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer"
            >
              {/* <img src={plusIcon} alt="Add New Icon" /> */}
              <span className="text-[16px] text-white">IN</span>
            </div>
            <div
             onClick={() => setInventoryTab("OUT")}
              className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer"
            >
              {/* <img src={plusIcon} alt="Add New Icon" /> */}
              <span className="text-[16px] text-white">OUT</span>
            </div>
          </div>
          <UniversalTable headers={headers} data={data} isAction={false} />
          <Pagination
            totalItems={100}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}
    </Layout>
  );
};

export default InventoryPage;
