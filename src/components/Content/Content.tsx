import React, { FC, useEffect } from "react";

import User from "../User/User";
import Repos from "../Repos/Repos";
import InitialPage from "../InitialPage/InitialPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import EmptyRepos from "../EmptyRepos/EmptyRepos";
import GlobalErrorPage from "../GlobalErrorPage/GlobalErrorPage";
import { requestRepos, requestUser } from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import styles from "./Content.module.css";

type IAppSelectorResult = {
  searchTerm: string;
  numberOfRepos: number;
  currentPage: number;
  isFetchingRepos: boolean;
  isFetchingUser: boolean;
  isError: boolean;
  isGlobalError: boolean;
  isNewUser: boolean;
}

const Content: FC = () => {
  const dispatch = useAppDispatch();
  // const {
  //   searchTerm,
  //   numberOfRepos,
  //   currentPage,
  //   isFetchingRepos,
  //   isFetchingUser,
  //   isError,
  //   isGlobalError,
  //   isNewUser } = useAppSelector(({user}): IAppSelectorResult => ({
  //   searchTerm: user.searchTerm,
  //   numberOfRepos: user.numberOfRepos,
  //   currentPage: user.currentPage,
  //   isFetchingRepos: user.isFetchingRepos,
  //   isFetchingUser: user.isFetchingUser,
  //   isError: user.isError,
  //   isGlobalError: user.isGlobalError,
  //   isNewUser: user.isNewUser,
  // }))

  const searchTerm = useAppSelector((state) => state.user.searchTerm);
  const numberOfRepos = useAppSelector((state) => state.user.numberOfRepos);
  const currentPage = useAppSelector((state) => state.user.currentPage);
  const isFetchingRepos = useAppSelector((state) => state.user.isFetchingRepos);
  const isFetchingUser = useAppSelector((state) => state.user.isFetchingUser);
  const isError = useAppSelector((state) => state.user.isError);
  const isGlobalError = useAppSelector((state) => state.user.isGlobalError);
  const isNewUser = useAppSelector((state) => state.user.isNewUser);

  console.log("RENDER CONTENT");

  useEffect(() => {
    if (searchTerm) {
      dispatch(requestUser(searchTerm));
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    if (searchTerm && !isNewUser) {
      dispatch(requestRepos({searchTerm, currentPage}));
    }
  }, [currentPage, dispatch, isNewUser]);

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
