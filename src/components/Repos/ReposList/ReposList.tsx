import React from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/store";
import Repo from "./Repo/Repo";
import styles from "./ReposList.module.css";

const ReposList = () => {
  const repos = useSelector((state: AppStateType) => state.user.repos);
  console.log("RENDER REPOS LIST");

  return (
    <div className={styles.reposList}>
      {repos &&
        repos.map((repo) => (
          <Repo
            key={repo.id}
            name={repo.name}
            url={repo.html_url}
            description={repo.description}
          />
        ))}
    </div>
  );
};

export default React.memo(ReposList);
