import React, { FC } from "react";

import { copy } from "../../copy";
import NotFoundPageIcon from "../common/Icons/NotFoundPageIcon/NotFoundPageIcon";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage: FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <NotFoundPageIcon />
      <div className={styles.notFoundMessageContainer}>
        <p>{copy.userNotFound}</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
