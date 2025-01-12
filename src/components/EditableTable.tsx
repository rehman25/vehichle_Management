import React, { useState } from "react";
import deleteIcon from "../assets/images/delete-icon.svg";
import editIcon from "../assets/images/edit-icon.svg";
import detailIcon from "../assets/images/detail-icon.svg";
import printIcon from "../assets/images/print-icon.svg";

type EditableTableProps = {
  headers: string[];
  data: Array<{ [key: string]: any }>;
  isAction?: boolean;
};

const EditableTable: React.FC<EditableTableProps> = ({
  headers,
  data,
  isAction = true,
}) => {
  const [tableData, setTableData] = useState(data);

  const handleInputChange = (
    rowIndex: number,
    header: string,
    value: string
  ) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][header] = value;
    setTableData(updatedData);
  };

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
            {isAction && (
              <th className="px-4 py-3 border border-[#E2E2E2] text-[12px]">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white transition">
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 border border-[#E2E2E2]"
                >
                  <input
                    type="text"
                    value={row[header] ?? ""}
                    onChange={(e) =>
                      handleInputChange(rowIndex, header, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </td>
              ))}
              {isAction && (
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
