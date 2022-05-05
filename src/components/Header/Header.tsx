import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";

import { useAppDispatch } from "../../hooks/redux-hooks";
import {setSearchTerm} from "../../redux/userSlice"
import LogoIcon from "../common/Icons/LogoIcon/LogoIcon";
import SearchIcon from "../common/Icons/SearchIcon/SearchIcon";
import styles from "./Header.module.css";

const Header: FC = () => {
  const [tempSearch, setTempSearch] = useState<string>("");
  const dispatch = useAppDispatch();

  const changeTempSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setTempSearch(event.target.value);
  };

  const changeSearchTerm = (): void => {
    dispatch(setSearchTerm(tempSearch));
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      dispatch(setSearchTerm(tempSearch));
    }
  };

  console.log("RENDER HEADER");

  return (
    <div className={styles.header}>
      <LogoIcon />
      <div className={styles.fieldContainer}>
        <button className={styles.button} onClick={changeSearchTerm}>
          <SearchIcon />
        </button>
        <input
          className={styles.input}
          placeholder="Enter GitHub username"
          value={tempSearch}
          autoFocus
          onChange={changeTempSearch}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Header;
