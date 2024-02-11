import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ handlePageChange, currentPage, itemCount, pageSize }) => {
  // console.log("currentPage", currentPage);
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((item) => (
          <li
            key={item}
            className={
              item === currentPage
                ? "page-item active page mx-2"
                : "page-item page mx-2"
            }
          >
            <Link className="page-link" onClick={() => handlePageChange(item)}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
