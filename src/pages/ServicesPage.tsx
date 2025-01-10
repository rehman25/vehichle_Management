import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import paidIcon from "../assets/images/saveandpaid.svg";
import addIcon from "../assets/images/add-icon.svg";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Pagination from "../components/Pagination";

const ServicesPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tableHeaders = [
    "Customer Name",
    "Service On",
    "Readings",
    "Due KMs",
    "Vehicle No",
    "Total Price",
    "Paid Amount",
    "Discount",
    "Created On",
    "Payment Type",
  ];
  const tableData = [
    {
      "Customer Name": "John Doe",
      "Service On": "2025-01-01",
      Readings: "15,000",
      "Due KMs": "5,000",
      "Vehicle No": "AB-1234",
      "Total Price": "$500",
      "Paid Amount": "$400",
      Discount: "$50",
      "Created On": "2025-01-01",
      "Payment Type": "Cash",
    },
    {
      "Customer Name": "Jane Smith",
      "Service On": "2025-01-02",
      Readings: "20,000",
      "Due KMs": "7,500",
      "Vehicle No": "XY-5678",
      "Total Price": "$600",
      "Paid Amount": "$500",
      Discount: "$100",
      "Created On": "2025-01-02",
      "Payment Type": "Card",
    },
    {
      "Customer Name": "Michael Brown",
      "Service On": "2025-01-03",
      Readings: "25,000",
      "Due KMs": "10,000",
      "Vehicle No": "CD-9012",
      "Total Price": "$700",
      "Paid Amount": "$600",
      Discount: "$50",
      "Created On": "2025-01-03",
      "Payment Type": "UPI",
    },
    {
      "Customer Name": "Emily Davis",
      "Service On": "2025-01-04",
      Readings: "12,000",
      "Due KMs": "3,000",
      "Vehicle No": "EF-3456",
      "Total Price": "$400",
      "Paid Amount": "$300",
      Discount: "$50",
      "Created On": "2025-01-04",
      "Payment Type": "Cash",
    },
    {
      "Customer Name": "Chris Evans",
      "Service On": "2025-01-05",
      Readings: "30,000",
      "Due KMs": "12,000",
      "Vehicle No": "GH-7890",
      "Total Price": "$800",
      "Paid Amount": "$700",
      Discount: "$100",
      "Created On": "2025-01-05",
      "Payment Type": "Net Banking",
    },
  ];

  return (
    <Layout>
      {showForm ? (
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Customer Service
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
                <img src={paidIcon} alt="paidIcon-Icon" />
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
                  Vehicle
                </p>
                <Dropdown
                  label="Select Vehicle"
                  options={["Option 4", "Option 2"]}
                />
              </div>

              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0 pl-4">
                  Reading
                </p>
                <Dropdown
                  label="Select Reading"
                  options={["Option 4", "Option 2"]}
                />
              </div>
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Date
                </p>
                <Input value={"12/11/2024"} />
              </div>

              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0 pl-4">
                  Due KMs
                </p>
                <Dropdown
                  label="Select Reading"
                  options={["Option 4", "Option 2"]}
                />
              </div>
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Paid Amount
                </p>
                <Dropdown
                  label="Select Vehicle"
                  options={["Option 4", "Option 2"]}
                />
              </div>

              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0 pl-4">
                  Payment Type
                </p>
                <Dropdown
                  label="Select Reading"
                  options={["Option 4", "Option 2"]}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end mt-5">
            <button className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
              <img src={addIcon} alt="add-Icon" />
              <span className="text-[16px] text-white">Add Service</span>
            </button>
          </div>

          <div className="flex items-center justify-end mt-5">
            <div className="p-12 bg-white border rounded-lg w-[40%] space-y-4 shadow-lg mt-5">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Total
                </p>
                <Input value={"0"} />
              </div>
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Discount
                </p>
                <Input value={"0"} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Services"}
            onAddNew={() => setShowForm(true)}
          />
          <UniversalTable headers={tableHeaders} data={tableData} />

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

export default ServicesPage;
