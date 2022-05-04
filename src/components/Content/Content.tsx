import React, { useEffect } from "react";
import EmptyRepos from "../EmptyRepos/EmptyRepos";
import InitialPage from "../InitialPage/InitialPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Repos from "../Repos/Repos";
import GlobalErrorPage from "../GlobalErrorPage/GlobalErrorPage";
import User from "../User/User";
import { requestRepos, requestUser } from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import styles from "./Content.module.css";


const Content: React.FC = () => {
  const dispatch = useAppDispatch();
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
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm && !isNewUser) {
      dispatch(requestRepos({searchTerm, currentPage}));
    }
  }, [currentPage]);

  if (searchTerm.length === 0) {
    return <InitialPage />;
  }

  if (isGlobalError) {
    return <GlobalErrorPage />;
  }

  if (isError) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.content}>
      <User />
      {numberOfRepos === 0 && !isFetchingRepos && !isFetchingUser ? <EmptyRepos /> : <Repos />}
    </div>
  );
};

export default Content;
