import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import Input from "../components/Input";
import Pagination from "../components/Pagination";

const MessageCenterPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const headers = [
    "Sent On",
    "Customer Name",
    "Vehicle Number",
    "SMS Type",
    "Language Type",
    "API Response",
    "Text",
  ];

  const data = [
    {
      "Sent On": "2025-01-01",
      "Customer Name": "John Doe",
      "Vehicle Number": "ABC1234",
      "SMS Type": "Service Reminder",
      "Language Type": "English",
      "API Response": "Success",
      Text: "Your vehicle is due for a service soon.",
    },
    {
      "Sent On": "2025-01-02",
      "Customer Name": "Jane Smith",
      "Vehicle Number": "XYZ5678",
      "SMS Type": "Part Replacement",
      "Language Type": "English",
      "API Response": "Success",
      Text: "Brake fluid replacement is required.",
    },
    {
      "Sent On": "2025-01-03",
      "Customer Name": "Michael Brown",
      "Vehicle Number": "LMN9101",
      "SMS Type": "Filter Reminder",
      "Language Type": "English",
      "API Response": "Success",
      Text: "It's time to replace the air filter.",
    },
    {
      "Sent On": "2025-01-04",
      "Customer Name": "Emily Davis",
      "Vehicle Number": "QRS2345",
      "SMS Type": "Coolant Check",
      "Language Type": "English",
      "API Response": "Success",
      Text: "Please check the coolant level in your vehicle.",
    },
    {
      "Sent On": "2025-01-05",
      "Customer Name": "David Wilson",
      "Vehicle Number": "TUV6789",
      "SMS Type": "Oil Change",
      "Language Type": "English",
      "API Response": "Success",
      Text: "Engine oil change is due. Visit us soon.",
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
            titleName={"Message Center"}
            onAddNew={() => setShowForm(true)}
            removeBtn={true}
          />
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
              {/* <img src={plusIcon} alt="Add New Icon" /> */}
              <span className="text-[16px] text-white">
                Send Message to All Customers
              </span>
            </div>
            <div className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
              {/* <img src={plusIcon} alt="Add New Icon" /> */}
              <span className="text-[16px] text-white">Message Template</span>
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

export default MessageCenterPage;
