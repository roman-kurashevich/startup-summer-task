import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import {setSearchTerm} from "../../redux/userSlice"
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [tempSearch, setTempSearch] = useState("");
  const dispatch = useAppDispatch();

  const changeTempSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setTempSearch(event.target.value);
  };

  const changeSearcTerm = (): void => {
    dispatch(setSearchTerm(tempSearch));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      dispatch(setSearchTerm(tempSearch));
    }
  };

  console.log("RENDER HEADER");

  return (
    <div className={styles.header}>
      <div>
        <svg
          width="42"
          height="40"
          viewBox="0 0 42 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_86_329)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5093 0C9.16808 0 0 9.16808 0 20.5093C0 29.5756 5.87436 37.2496 14.0238 39.966C15.0424 40.1698 15.416 39.5246 15.416 38.9813C15.416 38.5059 15.382 36.8761 15.382 35.1783C9.67742 36.4007 8.48897 32.7334 8.48897 32.7334C7.57216 30.3565 6.21392 29.7453 6.21392 29.7453C4.34635 28.489 6.34975 28.489 6.34975 28.489C8.42105 28.6248 9.50764 30.5942 9.50764 30.5942C11.3413 33.7182 14.2954 32.8353 15.4839 32.292C15.6537 30.9677 16.1969 30.0509 16.7742 29.5416C12.2241 29.0662 7.43633 27.3005 7.43633 19.4227C7.43633 17.1817 8.25127 15.348 9.5416 13.9219C9.33786 13.4126 8.62479 11.3073 9.74533 8.48896C9.74533 8.48896 11.4771 7.94567 15.382 10.5942C17.0119 10.1528 18.7776 9.91511 20.5093 9.91511C22.2411 9.91511 24.0068 10.1528 25.6367 10.5942C29.5416 7.94567 31.2733 8.48896 31.2733 8.48896C32.3939 11.3073 31.6808 13.4126 31.4771 13.9219C32.8014 15.348 33.5823 17.1817 33.5823 19.4227C33.5823 27.3005 28.7946 29.0323 24.2105 29.5416C24.9576 30.1868 25.6027 31.4092 25.6027 33.3446C25.6027 36.0951 25.5688 38.3022 25.5688 38.9813C25.5688 39.5246 25.9423 40.1698 26.961 39.966C35.1104 37.2496 40.9847 29.5756 40.9847 20.5093C41.0187 9.16808 31.8166 0 20.5093 0Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_86_329">
              <rect width="41.0187" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className={styles.fieldContainer}>
        <button className={styles.button} onClick={changeSearcTerm}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.23497 0C2.79706 0 0 2.79706 0 6.23497C0 9.67288 2.79706 12.4699 6.23497 12.4699C7.63766 12.4699 8.92987 11.9995 9.97123 11.216L12.4982 13.7422C12.6697 13.9138 12.8951 14 13.1202 14C13.3453 14 13.5707 13.9138 13.7422 13.7422C14.0862 13.3983 14.0862 12.8421 13.7422 12.4982L11.216 9.97123C11.9995 8.92987 12.4699 7.63766 12.4699 6.23497C12.4699 2.79706 9.67288 0 6.23497 0ZM1.75956 6.23497C1.75956 3.76687 3.76687 1.75956 6.23497 1.75956C8.70307 1.75956 10.7104 3.76687 10.7104 6.23497C10.7104 8.70307 8.70307 10.7104 6.23497 10.7104C3.76687 10.7104 1.75956 8.70307 1.75956 6.23497Z"
              fill="#808080"
            />
          </svg>
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
