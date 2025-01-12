import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import Input from "../components/Input";
import Pagination from "../components/Pagination";

const CreditServicingPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const headers = [
    "Customer Name",
    "Phone #",
    "Order # / Vehicle #",
    "Service Date",
    "Total",
    "Paid",
    "Discount",
    "Remaining",
  ];

  const data = [
    {
      "Customer Name": "Daily Expense",
      "Phone #": "123456789",
      "Order # / Vehicle #": "87847189781",
      "Service Date": "2025-01-01",
      Total: 50,
      Paid: 0,
      Discount: 0,
      Remaining: 50,
    },
    {
      "Customer Name": "Brake Fluid",
      "Phone #": "123456789",
      "Order # / Vehicle #": "87847189781",
      "Service Date": "2025-01-02",
      Total: 20,
      Paid: 0,
      Discount: 0,
      Remaining: 20,
    },
    {
      "Customer Name": "Air Filter",
      "Phone #": "123456789",
      "Order # / Vehicle #": "87847189781",
      "Service Date": "2025-01-03",
      Total: 15,
      Paid: 0,
      Discount: 0,
      Remaining: 15,
    },
    {
      "Customer Name": "Coolant",
      "Phone #": "123456789",
      "Order # / Vehicle #": "87847189781",
      "Service Date": "2025-01-04",
      Total: 25,
      Paid: 0,
      Discount: 0,
      Remaining: 25,
    },
    {
      "Customer Name": "Engine Oil",
      "Phone #": "123456789",
      "Order # / Vehicle #": "87847189781",
      "Service Date": "2025-01-05",
      Total: 30,
      Paid: 0,
      Discount: 0,
      Remaining: 30,
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
            titleName={"Credit Servicing"}
            onAddNew={() => setShowForm(true)}
            removeStatistics
            dateExist
            addBtnText={"Generate Report"}
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

export default CreditServicingPage;
