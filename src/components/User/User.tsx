import React, { FC, memo } from "react";

import Preloader from "../Preloader/Preloader";
import PeopleIcon from "../common/Icons/PeopleIcon/PeopleIcon";
import PersonIcon from "../common/Icons/PersonIcon/PersonIcon";
import { useAppSelector } from "../../hooks/redux-hooks";
import { IUser } from "../../redux/userSlice";
import { getConvertedFollowersNumber } from "./User.helpers";
import styles from "./User.module.css";

type IAppSelectorResult = {
  user: IUser;
  isFetchingUser: boolean;
}

const User: FC = () => {
  // const {user, isFetchingUser} = useAppSelector(({user}): IAppSelectorResult => ({
  //   user: user.user,
  //   isFetchingUser: user.isFetchingUser
  // }))
  const user = useAppSelector((state) => state.user.user);
  const isFetchingUser = useAppSelector(
    (state) => state.user.isFetchingUser
  );

  console.log("RENDER USER");

  const {
    avatar_url: avatar,
    name,
    login,
    followers,
    following,
    html_url: url,
  } = user;

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

          <div className={styles.followersContainer}>
            <div className={styles.followGroup}>
              <PeopleIcon />
              <div>{getConvertedFollowersNumber(followers)}</div>
              <p>followers</p>
            </div>

            <div className={styles.followGroup}>
              <PersonIcon />
              <div>{getConvertedFollowersNumber(following)}</div>
              <p>following</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(User);
