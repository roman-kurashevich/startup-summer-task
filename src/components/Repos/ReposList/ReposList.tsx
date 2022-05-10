import React, { FC, memo } from "react";

import { useAppSelector } from "../../../hooks/redux-hooks";
import { IRepo } from "../../../redux/userSlice";
import { selectors } from "../../../redux";

import ReposListItem from "./ReposListItem/ReposListItem";
import styles from "./ReposList.module.scss";

const ReposList: FC = () => {
  const repos = useAppSelector(selectors.repos);

  return (
    <div className={styles.reposList}>
      {repos &&
        repos.map((repo: IRepo) => (
          <ReposListItem key={repo.id} name={repo.name} url={repo.html_url} description={repo.description} />
        ))}
    </div>
  );
};

export default memo(ReposList);
