import React, { Dispatch, SetStateAction } from "react";

type Props = {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};
export const Pagination: React.FC<Props> = ({ page, totalPages, setPage }) => {
  const pages: (number | "...")[] = [];

  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1, 2, 3, 4, 5, 6, 7, "...", totalPages);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-6 ">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className="px-3 py-1 bg-transparent rounded-md  transition disabled:opacity-50"
      >
        {"<"}
      </button>

      {pages.map((currentPage, index) =>
        currentPage === "..." ? (
          <span key={index}>...</span>
        ) : (
          <button
            key={currentPage}
            onClick={() => setPage(currentPage)}
            className={currentPage === page ? "active" : ""}
          >
            {currentPage}
          </button>
        )
      )}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-3 py-1 bg-transparent rounded-md  transition disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
};
