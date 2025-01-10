import React from "react";

type InputProps = {
  value: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ value, type = "text", onChange }) => {
  return (
    <div className="flex-1 p-3 border text-[16px] text-[#424242] border-supporting_blue ">
      <input
        onChange={onChange}
        type={type}
        value={value}
        className="w-full outline-none"
      />
    </div>
  );
};

export default Input;
