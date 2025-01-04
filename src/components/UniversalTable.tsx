import React from "react";
import deleteIcon from "../assets/images/delete-icon.svg";
import editIcon from "../assets/images/edit-icon.svg";
import detailIcon from "../assets/images/detail-icon.svg";
import printIcon from "../assets/images/print-icon.svg";

type UniversalTableProps = {
  headers: string[];
};
const UniversalTable: React.FC<UniversalTableProps> = ({ headers }) => {
  return (
    <div className="overflow-x-auto p-2 mt-2">
      <table className="w-full table-auto bg-white shadow-md border border-[#E2E2E2]">
        <thead className="bg-[#494949] text-[#FFFFFF]">
          <tr>
            {headers?.map((header) => (
              <th
                key={header}
                className="px-4 py-3 border border-[#E2E2E2 text-[12px]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 13 }, (_, index) => (
            <tr key={index} className="bg-white transition">
              <td className="px-4 py-2 border border-[#E2E2E2]">John Doe</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">Jan, 01</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">125,000</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">10,000</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">1234</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">$500</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">$400</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">$100</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">25, May</td>
              <td className="px-4 py-2 border border-[#E2E2E2]">Cash</td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button className="w-[29px] h-[29px] flex items-center justify-center bg-secondary  rounded-[5px] text-white">
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
                <button className="w-[29px] h-[29px] flex items-center justify-center bg-primary  rounded-[5px] text-white">
                  <img src={editIcon} alt="editIcon" />
                </button>
                <button className="w-[29px] h-[29px] flex items-center justify-center bg-supporting_blue rounded-[5px] text-white">
                  <img src={detailIcon} alt="detailIcon" />
                </button>
                <button className="w-[29px] h-[29px] flex items-center justify-center bg-supporting_green rounded-[5px] text-white">
                  <img src={printIcon} alt="printIcon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversalTable;
