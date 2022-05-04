import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import ReposList from "./ReposList/ReposList";
import Preloader from "../Preloader/Preloader";
import Paginator from "../Paginator/Paginator";
import styles from "./Repos.module.css";

const Repos: React.FC = () => {
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

export default React.memo(Repos);
