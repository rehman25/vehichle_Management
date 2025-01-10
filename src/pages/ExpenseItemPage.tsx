import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import Dropdown from "../components/Dropdown";

const ExpenseItemPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const headers = ["Expense Category", "Expense Item", "Created On"];

  const data = [
    {
      "Expense Category": "Daily Expense",
      "Expense Item": "All general items",
      "Created On": "2025-01-01",
    },
    {
      "Expense Category": "Brake Fluid",
      "Expense Item": "Oil plus filter",
      "Created On": "2025-01-02",
    },
    {
      "Expense Category": "Air Filter",
      "Expense Item": "General expense",
      "Created On": "2025-01-03",
    },
    {
      "Expense Category": "Coolant",
      "Expense Item": "Diesel petrol",
      "Created On": "2025-01-04",
    },
    {
      "Expense Category": "Engine Oil",
      "Expense Item": "Transfer to AsadUllah Baloch",
      "Created On": "2025-01-05",
    },
  ];

  return (
    <Layout>
      {showForm ? (
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Expense Item
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
            </div>
          </div>

          {/* ---form fields--- */}
          <div className="p-12 bg-white border rounded-lg shadow-lg mt-5">
            <div className="flex items-center gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Expense Category
              </p>
              <Dropdown
                label="Select Category"
                options={["Option 4", "Option 2"]}
              />
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Expense Item
                </p>
                <Input value={"Expense Item"} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Expense Item"}
            onAddNew={() => setShowForm(true)}
            removeStatistics
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

export default ExpenseItemPage;
