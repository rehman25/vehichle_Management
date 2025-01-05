import Layout from "../constant/Layout";
import LayoutHeader from "../components/LayoutHeader";
import UniversalTable from "../components/UniversalTable";
import { useState } from "react";
import arrowIcon from "../assets/images/arrow-icon.svg";
import saveIcon from "../assets/images/save-btn.svg";
import addIcon from "../assets/images/add-icon.svg";
import Input from "../components/Input";

const ItemsPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const headers = [
    "Item Type",
    "Name",
    "Price",
    "Active",
    "Oil Mileage",
    "Available Qty",
    "Created On",
  ];
  const data = [
    {
      "Item Type": "Engine Oil",
      Name: "Castrol GTX",
      Price: "$25",
      Active: "Yes",
      "Oil Mileage": "10,000 KMs",
      "Available Qty": "50",
      "Created On": "2025-01-01",
    },
    {
      "Item Type": "Brake Fluid",
      Name: "DOT 4 Fluid",
      Price: "$15",
      Active: "Yes",
      "Oil Mileage": "N/A",
      "Available Qty": "120",
      "Created On": "2025-01-02",
    },
    {
      "Item Type": "Air Filter",
      Name: "K&N High Flow",
      Price: "$45",
      Active: "No",
      "Oil Mileage": "N/A",
      "Available Qty": "30",
      "Created On": "2025-01-03",
    },
    {
      "Item Type": "Coolant",
      Name: "Prestone Coolant",
      Price: "$20",
      Active: "Yes",
      "Oil Mileage": "50,000 KMs",
      "Available Qty": "70",
      "Created On": "2025-01-04",
    },
    {
      "Item Type": "Engine Oil",
      Name: "Mobil 1 Synthetic",
      Price: "$35",
      Active: "Yes",
      "Oil Mileage": "15,000 KMs",
      "Available Qty": "40",
      "Created On": "2025-01-05",
    },
  ];

  return (
    <Layout>
      {showForm ? (
        <div className="p-2">
          <div className="flex items-center justify-between">
            <p className="text-[24px] text-supporting_gray border-l border-[#000000] pl-4">
              Add Items
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
                Item Type
              </p>

              <Input value={"Engine Oil"} />
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Name
                </p>
                <Input value={"Awais Ullah Baloch"} />
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
                  Oil Mileage
                </p>
                <Input value={"300 KMs"} />
              </div>
            </div>

            <div className="flex mt-5 gap-x-4">
              <div className="flex items-center gap-x-4 flex-1">
                <p className="text-[16px]  font-bold text-supporting_gray w-32 flex-shrink-0">
                  Active
                </p>
                <input type="checkbox" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end mt-5">
            <button className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer">
              <img src={addIcon} alt="add-Icon" />
              <span className="text-[16px] text-white">Add Vehicle</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <LayoutHeader
            titleName={"Items"}
            onAddNew={() => setShowForm(true)}
          />
          <UniversalTable headers={headers} data={data} />
        </div>
      )}
    </Layout>
  );
};

export default ItemsPage;
