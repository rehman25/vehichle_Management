const Dropdown = ({ options }: { label?: string; options: string[] }) => {
  return (
    <div className="flex-1 p-3 border text-[16px] text-[#424242] border-supporting_blue">
      <select className="w-full outline-none">
        <option value="" disabled defaultValue="">
          ...Select...
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
