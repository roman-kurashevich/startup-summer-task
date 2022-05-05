import React, { FC } from "react";

import EmptyReposIcon from "../common/Icons/EmptyReposIcon/EmptyReposIcon";
import styles from "./EmptyRepos.module.css";

const EmptyRepos: FC = () => {
  return (
    <div className={styles.emptyRepos}>
      <EmptyReposIcon />
      <div className={styles.startingMessageContainer}>
        <p>Repository list is empty</p>
      </div>
    </div>
  );
};

export default EmptyRepos;
