import React from "react";
import styles from "./Repo.module.css";

export type RepoPropsType = {
  name: string
  description: string
  url: string
}

const Repo: React.FC<RepoPropsType> = ({ name, description, url }) => {
  return (
    <div className={styles.repo}>
      <a href={url} className={styles.name} target="_blank">
        {name}
      </a>
      <div className={styles.description}>
        {description ? description : name}
      </div>
    </div>
  );
};

export default Repo;
