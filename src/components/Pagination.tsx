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
    <div className="pagination">
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
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

      <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}>
        {">"}
      </button>
    </div>
  );
};
