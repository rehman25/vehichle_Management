const Input = ({value} : {value: string}) => {
  return (
    <div className="flex-1 p-3 border text-[16px] text-[#424242] border-supporting_blue ">
      <input type="text" value={value} className="w-full outline-none" />
  </div>
  )
}

export default Input