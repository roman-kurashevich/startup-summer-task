import React from "react";
import Repo from "./Repo/Repo";
import styles from "./ReposList.module.css";

const ReposList = ({ currentItems }) => {
  console.log("RENDER REPOS LIST");

  return (
    <div className={styles.reposList}>
      {currentItems &&
        currentItems.map((rep) => (
          <Repo
            key={rep.id}
            name={rep.name}
            url={rep.html_url}
            description={rep.description}
          />
        ))}
    </div>
  );
};

export default ReposList;
