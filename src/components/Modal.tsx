import React from "react";

type ModalProps = {
  modalRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

const ModalComponent: React.FC<ModalProps> = ({ modalRef, children }) => {
  return (
    <div
      ref={modalRef}
      className="hidden fixed inset-0 bg-black bg-opacity-60 items-center justify-center"
    >
      <div className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Add Vehicle</h2>
        {children}
        <div className="flex justify-end gap-x-4 mt-5">
          <button
            onClick={() => modalRef.current?.classList.add("hidden")}
            className="flex items-center justify-center gap-4 bg-primary rounded-[10px] p-4 cursor-pointer py-3 w-[80px]"
          >
            <span className="text-[16px] text-white">Cancel</span>
          </button>
          <button className="flex items-center justify-center gap-4 bg-supporting_blue rounded-[10px] py-3 px-4 cursor-pointer w-[80px]">
            <span className="text-[16px] text-white">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
