import React from "react";
import { useSelector } from "react-redux";
import ReposList from "./ReposList/ReposList";
import Preloader from "../Preloader/Preloader";
import Paginator from "../Paginator/Paginator";
import styles from "./Repos.module.css";
import { AppStateType } from "../../redux/store";

const Repos: React.FC = () => {
  const numberOfRepos = useSelector((state: AppStateType) => state.user.numberOfRepos);
  const isFetchingUser = useSelector((state: AppStateType) => state.user.isFetchingUser);
  const isFetchingRepos = useSelector((state: AppStateType) => state.user.isFetchingRepos);

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
