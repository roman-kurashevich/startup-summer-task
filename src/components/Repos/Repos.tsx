import React, { FC, memo } from "react";

import Paginator from "../Paginator/Paginator";
import Preloader from "../Preloader/Preloader";
import { useAppSelector } from "../../hooks/redux-hooks";
import { userSelectors } from "../../redux";

import ReposList from "./ReposList/ReposList";
import styles from "./Repos.module.scss";

const Repos: FC = () => {
  const numberOfRepos = useAppSelector(userSelectors.numberOfRepos);
  const isFetchingUser = useAppSelector(userSelectors.isFetchingUser);
  const isFetchingRepos = useAppSelector(userSelectors.isFetchingRepos);

  return (
    <div className={styles.repos}>
      {!isFetchingUser && <div className={styles.title}>Repositories ({isFetchingUser ? "" : numberOfRepos})</div>}
      {isFetchingRepos ? <Preloader /> : <ReposList />}
      {!isFetchingUser && <Paginator />}
    </div>
  );
};

export default memo(Repos);
