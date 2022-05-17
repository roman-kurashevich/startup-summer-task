import React, { FC, useEffect } from "react";

import User from "../User/User";
import Repos from "../Repos/Repos";
import InitialPage from "../InitialPage/InitialPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import EmptyRepos from "../EmptyRepos/EmptyRepos";
import GlobalErrorPage from "../GlobalErrorPage/GlobalErrorPage";
import { requestRepos, requestUser } from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { userSelectors } from "../../redux";

import styles from "./Content.module.scss";

const Content: FC = () => {
  const dispatch = useAppDispatch();

  const searchTerm = useAppSelector(userSelectors.searchTerm);
  const numberOfRepos = useAppSelector(userSelectors.numberOfRepos);
  const currentPage = useAppSelector(userSelectors.currentPage);
  const isFetchingRepos = useAppSelector(userSelectors.isFetchingRepos);
  const isFetchingUser = useAppSelector(userSelectors.isFetchingUser);
  const isError = useAppSelector(userSelectors.isError);
  const isGlobalError = useAppSelector(userSelectors.isGlobalError);
  const isNewUser = useAppSelector(userSelectors.isNewUser);

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
