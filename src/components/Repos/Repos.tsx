import React, { FC, memo } from "react";

import ReposList from "./ReposList/ReposList";
import Paginator from "../Paginator/Paginator";
import Preloader from "../Preloader/Preloader";
import { useAppSelector } from "../../hooks/redux-hooks";
import styles from "./Repos.module.css";

type IAppSelectorResult = {
  numberOfRepos: number;
  isFetchingUser: boolean;
  isFetchingRepos: boolean;
}

const Repos: FC = () => {
  // const {numberOfRepos, isFetchingUser, isFetchingRepos} = useAppSelector(({user}): IAppSelectorResult  => ({
  //   numberOfRepos: user.numberOfRepos,
  //   isFetchingUser: user.isFetchingUser,
  //   isFetchingRepos: user.isFetchingRepos,
  // }))
  const numberOfRepos = useAppSelector((state) => state.user.numberOfRepos);
  const isFetchingUser = useAppSelector((state) => state.user.isFetchingUser);
  const isFetchingRepos = useAppSelector((state) => state.user.isFetchingRepos);

  console.log("RENDER REPOS");

  return (
    <div className={styles.repos}>
      {!isFetchingUser && (
        <div className={styles.title}>
          Repositories ({isFetchingUser ? "" : numberOfRepos})
        </div>
      )}
      {isFetchingRepos ? (
        <Preloader />
      ) : (  
        <ReposList />
      )}
      {!isFetchingUser && <Paginator />}
    </div>
  );
};

export default memo(Repos);
