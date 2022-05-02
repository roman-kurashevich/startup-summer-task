import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { actions } from "../../redux/reducers/user";
import { ITEMS_PER_PAGE } from "../../constants/constants";
import { AppStateType } from "../../redux/store";
import styles from "./Paginator.module.css";

const Paginator: React.FC = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [paginatorStatusString, setPaginatorStatusString] = useState("");

  const dispatch = useDispatch();
  const currentPage = useSelector((state: AppStateType) => state.user.currentPage);
  const numberOfRepos = useSelector((state: AppStateType) => state.user.numberOfRepos);
  const itemsPerPage: number = ITEMS_PER_PAGE;

  const changeCurrentPage = (pageNumber: number): void => {
    dispatch(actions.toggleIsNewUserAC(false));
    dispatch(actions.setCurrentPageAC(pageNumber));
  };

  useEffect(() => {
    const endOffset: number = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(numberOfRepos / itemsPerPage));
    setPaginatorStatusString(
      `${itemOffset + 1}-${endOffset} of ${numberOfRepos} items`
    );
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (selectedItem: { selected: number }): void => {
    const newOffset = (selectedItem.selected * itemsPerPage) % numberOfRepos;
    changeCurrentPage(selectedItem.selected);
    setItemOffset(newOffset);
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        <p>{paginatorStatusString}</p>
      </div>
      <ReactPaginate
        nextLabel={
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#808080" strokeWidth="2" />
          </svg>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.41412 6.00008L7.70701 1.70718L6.2928 0.292969L0.585693 6.00008L6.2928 11.7072L7.70701 10.293L3.41412 6.00008Z"
              fill="#808080"
            />
          </svg>
        }
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        previousClassName={styles.pageItem}
        previousLinkClassName={styles.pageLink}
        nextClassName={styles.pageItem}
        nextLinkClassName={styles.pageLink}
        breakLabel="..."
        breakClassName={styles.pageItem}
        breakLinkClassName={styles.pageLink}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        //@ts-ignore
        // renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Paginator;
