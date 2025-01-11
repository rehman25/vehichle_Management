import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import Input from "../components/Input";
import Pagination from "../components/Pagination";

const PettyCashPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const headers = ["Date", "Amount", "Description", "Created On"];

  const data = [
    {
      Date: "2025-01-01",
      Amount: 50,
      Description: "Daily Expense",
      "Created On": "2025-01-01",
    },
    {
      Date: "2025-01-02",
      Amount: 20,
      Description: "Brake Fluid",
      "Created On": "2025-01-02",
    },
    {
      Date: "2025-01-03",
      Amount: 15,
      Description: "Air Filter",
      "Created On": "2025-01-03",
    },
    {
      Date: "2025-01-04",
      Amount: 25,
      Description: "Coolant",
      "Created On": "2025-01-04",
    },
    {
      Date: "2025-01-05",
      Amount: 30,
      Description: "Engine Oil",
      "Created On": "2025-01-05",
    },
  ];

  return (
    <Layout>
      {showForm ? (
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Petty Cash
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
          <div className="p-12 bg-white space-y-4 border rounded-lg shadow-lg mt-5">
            <div className="flex items-center gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Date
              </p>
              <Input value={"2025-01-01"} />
            </div>
            <div className="flex items-center gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Amount
              </p>
              <Input value={"2300 Rs."} />
            </div>
            <div className="flex items-center gap-x-4">
              <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
                Description
              </p>
              <Input value={"Daily Expense"} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Petty Cash"}
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

export default PettyCashPage;
