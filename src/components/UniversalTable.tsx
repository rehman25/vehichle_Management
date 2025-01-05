import React from "react";
import deleteIcon from "../assets/images/delete-icon.svg";
import editIcon from "../assets/images/edit-icon.svg";
import detailIcon from "../assets/images/detail-icon.svg";
import printIcon from "../assets/images/print-icon.svg";

type UniversalTableProps = {
  headers: string[]; 
  data: Array<{ [key: string]: any }>; 
};

const UniversalTable: React.FC<UniversalTableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto p-2 mt-2">
      <table className="w-full table-auto bg-white shadow-md border border-[#E2E2E2]">
        <thead className="bg-[#494949] text-[#FFFFFF]">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 border border-[#E2E2E2] text-[12px]"
              >
                {header}
              </th>
            ))}
            <th className="px-4 py-3 border border-[#E2E2E2] text-[12px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white transition">
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 border border-[#E2E2E2]"
                >
                  {row[header] ?? "-"} 
                </td>
              ))}
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button className="w-[29px] h-[29px] flex items-center justify-center bg-secondary rounded-[5px] text-white">
                  <img src={deleteIcon} alt="deleteIcon" />
                </button>
                <button className="w-[29px] h-[29px] flex items-center justify-center bg-primary rounded-[5px] text-white">
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
