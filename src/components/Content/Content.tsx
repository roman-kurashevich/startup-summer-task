import React, { FC, useEffect } from "react";

import User from "../User/User";
import Repos from "../Repos/Repos";
import InitialPage from "../InitialPage/InitialPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import EmptyRepos from "../EmptyRepos/EmptyRepos";
import GlobalErrorPage from "../GlobalErrorPage/GlobalErrorPage";
import { requestRepos, requestUser } from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { selectors } from "../../redux";

import styles from "./Content.module.scss";

const Content: FC = () => {
  const dispatch = useAppDispatch();

  const searchTerm = useAppSelector(selectors.searchTerm);
  const numberOfRepos = useAppSelector(selectors.numberOfRepos);
  const currentPage = useAppSelector(selectors.currentPage);
  const isFetchingRepos = useAppSelector(selectors.isFetchingRepos);
  const isFetchingUser = useAppSelector(selectors.isFetchingUser);
  const isError = useAppSelector(selectors.isError);
  const isGlobalError = useAppSelector(selectors.isGlobalError);
  const isNewUser = useAppSelector(selectors.isNewUser);

  console.log("RENDER CONTENT");

  useEffect(() => {
    if (searchTerm) {
      dispatch(requestUser(searchTerm));
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    if (searchTerm && !isNewUser) {
      dispatch(requestRepos({ searchTerm, currentPage }));
    }
  }, [currentPage, dispatch, isNewUser, searchTerm]);

  if (searchTerm.length === 0) {
    return <InitialPage />;
  }

  if (isGlobalError) {
    return <GlobalErrorPage />;
  }

  if (isError) {
    return <NotFoundPage />;
  }

  const shouldShowRepos: boolean = numberOfRepos === 0 && !isFetchingRepos && !isFetchingUser;
  
  return (
    <div className={styles.content}>
      <User />
      {shouldShowRepos ? <EmptyRepos /> : <Repos />}
    </div>
  );
};

export default Content;
