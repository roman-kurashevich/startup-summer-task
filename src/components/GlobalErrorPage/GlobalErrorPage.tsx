import React, { FC } from "react";

import NotFoundPageIcon from "../common/Icons/NotFoundPageIcon/NotFoundPageIcon";
import styles from "./GlobalErrorPage.module.css";

const GlobalErrorPage: FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <NotFoundPageIcon />
      <div className={styles.notFoundMessageContainer}>
        <p>Something went wrong</p>
      </div>
    </div>
  );
};

export default GlobalErrorPage;
