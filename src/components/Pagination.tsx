import React from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="px-4 py-2 bg-[#D9D9D9] rounded-[5px]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-[5px] ${
            currentPage === index + 1
              ? "border-[1px] border-primary"
              : "border-[1px] border-[#E2E2E2]"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="px-4 py-2 rounded-[5px] border-[1px] border-[#000000]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
