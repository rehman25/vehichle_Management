import React from "react";
import servicesSvg from "../assets/images/services-logo.svg";
import plusIcon from "../assets/images/plus-icon.svg";

type LayoutHeaderProps = {
  titleName?: string;
  onAddNew?: () => void;
  removeStatistics?: boolean;
};

const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  titleName,
  onAddNew,
  removeStatistics,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-2">
      <div className="flex items-center gap-4 bg-secondary rounded-[10px] w-auto py-3 px-4">
        <img
          className="filter invert hue-rotate-90"
          src={servicesSvg}
          alt="Services-icon"
        />
        <span className="text-[20px] text-white">{titleName}</span>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-[344px] max-w-full border border-supporting_blue px-2 py-2 font-givonic-regular outline-none placeholder:text-black text-[16px]"
          placeholder="Search"
        />

        {!removeStatistics && (
          <div className="flex items-center gap-4 bg-supporting_blue py-3 px-4 rounded-[10px]">
            <div className="flex items-center gap-2">
              <span className="text-[16px] text-white">Today</span>
              <div className="bg-white h-[28px] rounded-full flex items-center px-2">
                <span className="text-[13px]">18500</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[16px] text-white">This Week</span>
              <div className="bg-white h-[28px] rounded-full flex items-center px-2">
                <span className="text-[13px]">1850000</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[16px] text-white">This Month</span>
              <div className="bg-white h-[28px] rounded-full flex items-center px-2">
                <span className="text-[13px]">2285000</span>
              </div>
            </div>
          </div>
        )}

        <div
          onClick={onAddNew}
          className="flex items-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer"
        >
          <img src={plusIcon} alt="Add New Icon" />
          <span className="text-[16px] text-white">Add New</span>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
