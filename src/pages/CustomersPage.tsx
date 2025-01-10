import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useRef, useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import addIcon from "../assets/images/add-icon.svg";
import Input from "../components/Input";
import Pagination from "../components/Pagination";
import ModalComponent from "../components/Modal";
import Dropdown from "../components/Dropdown";

const CustomersPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const headers = [
    "Name",
    "Date",
    "Salary",
    "Bonus",
    "ID",
    "Total",
    "Remaining",
    "Paid",
    "Due Date",
    "Payment Method",
  ];
  const data = [
    {
      Name: "John Doe",
      Date: "Jan, 01",
      Salary: "125,000",
      Bonus: "10,000",
      ID: "1234",
      Total: "$500",
      Remaining: "$400",
      Paid: "$100",
      "Due Date": "25, May",
      "Payment Method": "Cash",
    },
    {
      Name: "Jane Smith",
      Date: "Feb, 15",
      Salary: "150,000",
      Bonus: "15,000",
      ID: "5678",
      Total: "$600",
      Remaining: "$500",
      Paid: "$100",
      "Due Date": "30, May",
      "Payment Method": "Card",
    },
  ];

  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove("hidden");
      modalRef.current.classList.add("flex");
    }
  };

  return (
    <Layout>
      {showForm ? (
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Service
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
                Name
              </p>

              <Input value={"John Doe"} />
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Mobile Number
                </p>
                <Input value={"123456789"} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end mt-5">
            <button
              onClick={handleOpenModal}
              className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer"
            >
              <img src={addIcon} alt="add-Icon" />
              <span className="text-[16px] text-white">Add Vehicle</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Customers"}
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

      <ModalComponent modalRef={modalRef}>
        <div>
          <div className="flex items-center gap-x-4">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Customer
            </p>

            <Dropdown
              label="Select Customer"
              options={["Option 4", "Option 2"]}
            />
          </div>
          <div className="flex items-center gap-x-4 mt-5">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Car
            </p>
            <Input value="Hond City" />
          </div>
          <div className="flex items-center gap-x-4 mt-5">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Reading
            </p>
            <Input value="0" />
          </div>
          <div className="flex items-center gap-x-4 mt-5">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Last Visit
            </p>
            <Input type="date" value="" />
          </div>
          <div className="flex items-center gap-x-4 mt-5">
            <p className="text-[16px] font-bold text-supporting_gray w-32 flex-shrink-0">
              Last Visit
            </p>
            <input type="checkbox" />
          </div>
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default CustomersPage;
