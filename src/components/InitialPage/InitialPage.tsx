import React, { FC } from "react";

import InitialPageIcon from "../common/Icons/InitialPageIcon/InitialPageIcon";
import styles from "./InitialPage.module.css";

const InitialPage: FC = () => {
  return (
    <div className={styles.initialPage}>
      <InitialPageIcon />
      <div className={styles.startingMessageContainer}>
        <p>Start with searching a GitHub user</p>
      </div>
    </div>
  );
};

export default InitialPage;
