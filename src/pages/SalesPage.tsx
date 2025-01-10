import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import addIcon from "../assets/images/add-icon.svg";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import Dropdown from "../components/Dropdown";

const SalesPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const headers = [
    "Order Number",
    "Customer",
    "Date",
    "Created On",
    "Amount",
    "Paid",
    "Discount",
  ];

  const data = [
    {
      "Order Number": "001",
      Customer: "John Doe",
      Date: "2025-01-01",
      "Created On": "2025-01-01",
      Amount: "$250",
      Paid: "Yes",
      Discount: "5%",
    },
    {
      "Order Number": "002",
      Customer: "Jane Smith",
      Date: "2025-01-02",
      "Created On": "2025-01-02",
      Amount: "$150",
      Paid: "No",
      Discount: "10%",
    },
    {
      "Order Number": "003",
      Customer: "Mike Johnson",
      Date: "2025-01-03",
      "Created On": "2025-01-03",
      Amount: "$300",
      Paid: "Yes",
      Discount: "0%",
    },
    {
      "Order Number": "004",
      Customer: "Emily Davis",
      Date: "2025-01-04",
      "Created On": "2025-01-04",
      Amount: "$400",
      Paid: "Yes",
      Discount: "15%",
    },
    {
      "Order Number": "005",
      Customer: "David Brown",
      Date: "2025-01-05",
      "Created On": "2025-01-05",
      Amount: "$500",
      Paid: "No",
      Discount: "20%",
    },
  ];

  return (
    <Layout>
      {showForm ? (
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Sales
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-4 bg-primary rounded-[10px] p-4 cursor-pointer py-3 px-4"
              >
                <img src={arrowIcon} alt="arrowIcon-Icon" />
                <span className="text-[16px] text-white">Back</span>
              </button>
              <button className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
                <img src={saveIcon} alt="save-Icon" />
                <span className="text-[16px] text-white">Save</span>
              </button>
              <button className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
                <img src={saveIcon} alt="save-Icon" />
                <span className="text-[16px] text-white">Save & Paid</span>
              </button>
            </div>
          </div>

          {/* ---form fields--- */}
          <div className="p-12 bg-white border rounded-lg shadow-lg mt-5">
            <div className="flex items-center gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Customer
              </p>
              <Dropdown
                label="Select Customer"
                options={["Option 4", "Option 2"]}
              />
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Item
                </p>
                <Dropdown
                  label="Select Item"
                  options={["Option 4", "Option 2"]}
                />
              </div>
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Price
                </p>
                <Input value={"350 Rs"} />
              </div>
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Price
                </p>
                <Input value={"350 Rs"} />
              </div>
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Quantity
                </p>
                <Input value={"0"} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end mt-5">
            <button className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
              <img src={addIcon} alt="add-Icon" />
              <span className="text-[16px] text-white">Add Item</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Sales"}
            onAddNew={() => setShowForm(true)}
          />
          <UniversalTable headers={headers} data={data} />

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

export default SalesPage;
