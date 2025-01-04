import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import paidIcon from "../assets/images/saveandpaid.svg";

const ServicesPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
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
    "Actions",
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
          <div className="max-w-6xl mx-auto p-12 bg-white border rounded-lg shadow-lg mt-5">
            <div className="flex items-center gap-x-4">
              <p className="text-[16px] text-supporting_gray w-32 flex-shrink-0">
                Customer
              </p>

              <div className="flex-1 p-3 border text-[16px] text-[#424242] border-supporting_blue ">
                <select className="w-full outline-none ">
                  <option value="" disabled selected>
                    ...Select...
                  </option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px] text-supporting_gray w-32 flex-shrink-0">
                  Vehicle
                </p>
                <div className="flex-1 p-3 border text-[16px] text-[#424242] border-supporting_blue ">
                  <select className="w-full outline-none ">
                    <option value="" disabled selected>
                      ...Select...
                    </option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px] text-supporting_gray w-32 flex-shrink-0 pl-4">
                  Reading
                </p>
                <div className="flex-1 p-3 border text-[16px] text-[#424242] border-supporting_blue ">
                  <select className="w-full outline-none ">
                    <option value="" disabled selected>
                      ...Select...
                    </option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
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
          <UniversalTable headers={tableHeaders} />
        </div>
      )}
    </Layout>
  );
};

export default ServicesPage;
