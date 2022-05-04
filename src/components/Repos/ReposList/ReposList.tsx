import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import Repo from "./Repo/Repo";
import styles from "./ReposList.module.css";

const ReposList: React.FC = () => {
  const repos = useAppSelector((state) => state.user.repos);
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
