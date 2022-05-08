import React, { FC } from "react";

import styles from "./ReposListItem.module.scss";

export type IRepoProps = {
  name: string;
  description: string;
  url: string;
};

const ReposListItem: FC<IRepoProps> = ({ name, description, url }) => {
  return (
    <div className={styles.repo}>
      <a href={url} className={styles.name} target="_blank" rel="noreferrer">
        {name}
      </a>
      <div className={styles.description}>
        {description || name}
      </div>
    </div>
  );
};

export default ReposListItem;
