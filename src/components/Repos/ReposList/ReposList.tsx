import React, { FC, memo } from "react";

import ReposListItem from "./ReposListItem/ReposListItem";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { IRepo } from "../../../redux/userSlice";
import styles from "./ReposList.module.css";

const ReposList: FC = () => {
  const repos = useAppSelector((state) => state.user.repos);
  console.log("RENDER REPOS LIST");

  return (
    <div className={styles.reposList}>
      {repos &&
        repos.map((repo: IRepo) => (
          <ReposListItem
            key={repo.id}
            name={repo.name}
            url={repo.html_url}
            description={repo.description}
          />
        ))}
    </div>
  );
};

export default memo(ReposList);
