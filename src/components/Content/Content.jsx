import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyRepos from "../EmptyRepos/EmptyRepos";
import InitialPage from "../InitialPage/InitialPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Repos from "../Repos/Repos";
import User from "../User/User";
import { requestRepos, requestUser } from "../../redux/reducers/user";
import styles from "./Content.module.css";

const Content = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.user.searchTerm);
  const numberOfRepos = useSelector((state) => state.user.numberOfRepos);
  const currentPage = useSelector((state) => state.user.currentPage);
  const isFetchingRepos = useSelector((state) => state.user.isFetchingRepos);
  const isError = useSelector((state) => state.user.isError);
  const isNewUser = useSelector((state) => state.user.isNewUser);

  console.log("RENDER CONTENT");

  useEffect(() => {
    if (searchTerm) {
      dispatch(requestUser(searchTerm));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm && !isNewUser) {
      dispatch(requestRepos(searchTerm, currentPage));
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
      {numberOfRepos === 0 && !isFetchingRepos ? <EmptyRepos /> : <Repos />}
    </div>
  );
};

export default Content;
