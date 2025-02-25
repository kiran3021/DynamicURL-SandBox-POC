import React, { useEffect } from "react";

interface PaginationProps {
  dataLength: number;
  rowsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void; // ✅ Corrected Function type
  alwaysShown: boolean; // ✅ Changed Boolean to boolean
}

const Pagination = ({
  dataLength,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  alwaysShown = true,
}: PaginationProps) => {
  const pagesCount = Math.ceil(dataLength / rowsPerPage);
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const changePage = (number: number) => {
    if (currentPage === number) return;
    setCurrentPage(number);
  };

  const onPageNumberClick = (pageNumber: number) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const onNextPageClick = () => {
    if (currentPage < pagesCount) {
      changePage(currentPage + 1);
    }
  };

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount && pagesCount) {
      setCurrentPage(pagesCount);
    }
  };

  let isPageNumberOutOfRange = false; // ✅ Defined outside .map()

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <li
          className="page-item"
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
        >
          <a
            href="#"
            role="button"
            className={`page-link${currentPage === pageNumber ? " active" : ""
              }`}
          >
            {pageNumber}
          </a>
        </li>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <span key={`dots-${pageNumber}`}>...</span>; // ✅ Added unique key
    }

    return null;
  });

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <>
      {isPaginationShown && (
        <nav className="page" aria-label="page-navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item" onClick={onPreviousPageClick}>
              <a href="#" role="button" className="page-link">
                Previous
              </a>
            </li>
            {pageNumbers}
            <li className="page-item" onClick={onNextPageClick}>
              <a href="#" role="button" className="page-link">
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
