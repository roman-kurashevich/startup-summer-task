import React, { FC } from "react";

import { copy } from "../../copy";
import InitialPageIcon from "../common/Icons/InitialPageIcon/InitialPageIcon";

import styles from "./InitialPage.module.scss";

const InitialPage: FC = () => {
  return (
    <div className={styles.initialPage}>
      <InitialPageIcon />
      <div className={styles.startingMessageContainer}>
        <p>{copy.startSearching}</p>
      </div>
    </div>
  );
};

export default InitialPage;
