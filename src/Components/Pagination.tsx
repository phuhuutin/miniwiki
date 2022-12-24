import React from "react";
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginate: any;
};

export const Pagination = ({
  currentPage,
  totalPages,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  if (currentPage === 1) {
    pageNumbers.push(currentPage);
    if (totalPages >= currentPage + 1) {
      pageNumbers.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumbers.push(currentPage + 2);
    }
  } else if (currentPage > 1) {
    if (currentPage >= 3) {
      pageNumbers.push(currentPage - 2);
      pageNumbers.push(currentPage - 1);
    } else {
      pageNumbers.push(currentPage - 1);
    }

    pageNumbers.push(currentPage);

    if (totalPages >= currentPage + 1) {
      pageNumbers.push(currentPage + 1);
    }
    if (totalPages >= currentPage + 2) {
      pageNumbers.push(currentPage + 2);
    }
  }

  return (
    <nav aria-label='Page navigation example  '>
      <ul className='inline-flex -space-x-px my-5'>
        <li onClick={() => paginate(1)} className='pl-1'>
          <button className='px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg '>
            First
          </button>
        </li>
        {pageNumbers.map((number) =>
          number === currentPage ? (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={
                "pl-1 " +
                "page-item " +
                (currentPage === number ? "active" : "")
              }
            >
              <button className='page-link px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 bg-pink-100 rounded-lg  active'>
                {number}
              </button>
            </li>
          ) : (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={
                "pl-1 page-item " + (currentPage === number ? "active" : "")
              }
            >
              <button className='page-link px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg  '>
                {number}
              </button>
            </li>
          )
        )}

        <li onClick={() => paginate(totalPages)} className='pl-1'>
          <button className='px-3 py-2 ml-0 leading-tight text-gray-500  border border-gray-300 rounded-lg  '>
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};
