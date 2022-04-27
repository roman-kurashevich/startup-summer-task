import React from "react";
import { useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";
import styles from "./User.module.css";

const User = () => {
  const user = useSelector((state) => state.user.user);
  const isFetchingUser = useSelector((state) => state.user.isFetchingUser);

  console.log("RENDER USER");

  const {
    avatar_url: avatar,
    name,
    login,
    followers,
    following,
    html_url: url,
  } = user;

  const followersNumberConverter = (followersNumber) => {
    if (followersNumber >= 1000) {
      return (followersNumber / 1000).toFixed(1) + "k";
    }
    return followersNumber;
  };

  return (
    <div className={styles.user}>
      {isFetchingUser ? (
        <Preloader />
      ) : (
        <>
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} src={avatar} alt="user avatar" />
          </div>

          <div className={styles.name}>{name}</div>

          <a className={styles.link} href={url} target="_blank">
            {login}
          </a>

          <div className={styles.folowersContainer}>
            <div className={styles.folowGroup}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.028 8.73877C11.028 10.3988 9.69338 11.7388 8.02764 11.7388C6.3619 11.7388 5.01726 10.3988 5.01726 8.73877C5.01726 7.07877 6.3619 5.73877 8.02764 5.73877C9.69338 5.73877 11.028 7.07877 11.028 8.73877ZM19.0557 8.73877C19.0557 10.3988 17.7211 11.7388 16.0553 11.7388C14.3896 11.7388 13.0449 10.3988 13.0449 8.73877C13.0449 7.07877 14.3896 5.73877 16.0553 5.73877C17.7211 5.73877 19.0557 7.07877 19.0557 8.73877ZM8.02764 13.7388C5.68958 13.7388 1.00342 14.9088 1.00342 17.2388V18.7388C1.00342 19.2888 1.45498 19.7388 2.00688 19.7388H14.0484C14.6003 19.7388 15.0519 19.2888 15.0519 18.7388V17.2388C15.0519 14.9088 10.3657 13.7388 8.02764 13.7388ZM15.082 13.7888C15.4332 13.7588 15.7643 13.7388 16.0553 13.7388C18.3934 13.7388 23.0795 14.9088 23.0795 17.2388V18.7388C23.0795 19.2888 22.628 19.7388 22.0761 19.7388H16.8782C16.9885 19.4288 17.0588 19.0888 17.0588 18.7388V17.2388C17.0588 15.7688 16.266 14.6588 15.1221 13.8288C15.1191 13.8257 15.116 13.8218 15.1127 13.8175C15.1051 13.8076 15.096 13.7957 15.082 13.7888Z"
                  fill="#808080"
                />
              </svg>

              <div>{followersNumberConverter(followers)}</div>
              <p>followers</p>
            </div>

            <div className={styles.folowGroup}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.0553 8.73877C16.0553 10.9488 14.2591 12.7388 12.0415 12.7388C9.82383 12.7388 8.02763 10.9488 8.02763 8.73877C8.02763 6.52877 9.82383 4.73877 12.0415 4.73877C14.2591 4.73877 16.0553 6.52877 16.0553 8.73877ZM4.01379 18.7388C4.01379 16.0788 9.36224 14.7388 12.0415 14.7388C14.7207 14.7388 20.0692 16.0788 20.0692 18.7388V19.7388C20.0692 20.2888 19.6176 20.7388 19.0657 20.7388H5.01725C4.46535 20.7388 4.01379 20.2888 4.01379 19.7388V18.7388Z"
                  fill="#808080"
                />
              </svg>
              <div>{followersNumberConverter(following)}</div>
              <p>following</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(User);
