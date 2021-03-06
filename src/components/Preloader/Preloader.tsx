import React, { FC } from "react";

import styles from "./Preloader.module.scss";

const Preloader: FC = () => {
  return <div className={styles.loader} />;
};

export default Preloader;
