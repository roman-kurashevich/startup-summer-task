import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyRepos from "../EmptyRepos/EmptyRepos";
import InitialPage from "../InitialPage/InitialPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Repos from "../Repos/Repos";
import User from "../User/User";
import { requestRepos, requestUser } from "../../redux/reducers/user";
import { AppStateType } from "../../redux/store";
import styles from "./Content.module.css";
import { Dispatch } from "redux";


const Content = () => {
  const dispatch = useDispatch();
  // const dispatch = useThunkDispatch();
  const searchTerm = useSelector((state: AppStateType) => state.user.searchTerm);
  const numberOfRepos = useSelector((state: AppStateType) => state.user.numberOfRepos);
  const currentPage = useSelector((state: AppStateType) => state.user.currentPage);
  const isFetchingRepos = useSelector((state: AppStateType) => state.user.isFetchingRepos);
  const isFetchingUser = useSelector((state: AppStateType) => state.user.isFetchingUser);
  const isError = useSelector((state: AppStateType) => state.user.isError);
  const isNewUser = useSelector((state: AppStateType) => state.user.isNewUser);

  console.log("RENDER CONTENT");

  useEffect(() => {
    if (searchTerm) {
      dispatch(requestUser(searchTerm) as any);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm && !isNewUser) {
      dispatch(requestRepos(searchTerm, currentPage) as any);
    }
  }, [currentPage]);

  if (searchTerm.length === 0) {
    return <InitialPage />;
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
