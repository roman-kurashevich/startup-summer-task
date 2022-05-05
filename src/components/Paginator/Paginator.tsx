import React, { FC, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import PaginationPreviousIcon from "../common/Icons/PaginationPreviousIcon/PaginationPreviousIcon";
import PaginationNextIcon from "../common/Icons/PaginationNextIcon/PaginationNextIcon";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { toggleIsNewUser, setCurrentPage } from "../../redux/userSlice";
import { ITEMS_PER_PAGE } from "../../constants/constants";
import styles from "./Paginator.module.css";

type IAppSelectorResult = {
  currentPage: number;
  numberOfRepos: number;
}

const Paginator: FC = () => {
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [paginatorStatus, setPaginatorStatus] = useState<string>("");

  const dispatch = useAppDispatch();
  const {currentPage, numberOfRepos} =useAppSelector(({user}): IAppSelectorResult => ({
    currentPage: user.currentPage,
    numberOfRepos: user.numberOfRepos,
  }))

  const handlePageClick = (selectedItem: { selected: number }): void => {
    const newOffset = (selectedItem.selected * ITEMS_PER_PAGE) % numberOfRepos;
    changeCurrentPage(selectedItem.selected);
    setItemOffset(newOffset);
  };

  const changeCurrentPage = (pageNumber: number): void => {
    dispatch(toggleIsNewUser(false));
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    const endOffset: number = itemOffset + ITEMS_PER_PAGE;
    setPageCount(Math.ceil(numberOfRepos / ITEMS_PER_PAGE));
    setPaginatorStatus(
      `${itemOffset + 1}-${endOffset} of ${numberOfRepos} items`
    );
  }, [itemOffset, numberOfRepos, ITEMS_PER_PAGE]);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        <p>{paginatorStatus}</p>
      </div>
      <ReactPaginate
        nextLabel={<PaginationNextIcon />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<PaginationPreviousIcon />}
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
        forcePage={currentPage}
      />
    </div>
  );
};

export default Paginator;
