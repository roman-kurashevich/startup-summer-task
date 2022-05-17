import React, { FC } from "react";

import { copy } from "../../copy";
import NotFoundPageIcon from "../common/Icons/NotFoundPageIcon/NotFoundPageIcon";

import styles from "./GlobalErrorPage.module.scss";

const GlobalErrorPage: FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <NotFoundPageIcon />
      <div className={styles.notFoundMessageContainer}>
        <p>{copy.somethingWentWrong}</p>
      </div>
    </div>
  );
};

export default GlobalErrorPage;
