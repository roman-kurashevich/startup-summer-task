import React, { useEffect, useState } from "react";
import { getRepos, getUser } from "../../api/users-api";
import { ITEMS_PER_PAGE } from "../../constants/constants";
import EmptyRepos from "../EmptyRepos/EmptyRepos";
import InitialPage from "../InitialPage/InitialPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Repos from "../Repos/Repos";
import User from "../User/User";
import styles from "./Content.module.css";

const Content = ({ searchTerm }) => {
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfRepos, setNumberOfRepos] = useState(0);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [isGlobalError, setIsGlobalError] = useState(false);

  console.log("RENDER CONTENT");

  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (searchTerm) {
      setIsFetchingUser(true);
      getUser(searchTerm)
        .then((data) => {
          setUser(data);
          setIsError(false);
          setNumberOfRepos(data.public_repos);
          setCurrentPage(0);
          setIsFetchingUser(false);
        })
        .catch((e) => {
          if (e.response.status === 404) {
            setIsError(true);
            setIsFetchingUser(false);
          }
        });
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      setIsFetchingRepos(true);
      getRepos(searchTerm, currentPage).then((data) => {
        setRepos(data);
        setIsFetchingRepos(false);
      });
    }
  }, [searchTerm, currentPage]);

  if (searchTerm.length === 0) {
    return <InitialPage />;
  }

  if (isError) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.content}>
      <User
        avatar={user.avatar_url}
        name={user.name}
        login={user.login}
        followers={user.followers}
        following={user.following}
        url={user.html_url}
        isFetchingUser={isFetchingUser}
      />
      {numberOfRepos === 0 && !isFetchingRepos ? (
        <EmptyRepos />
      ) : (
        <Repos
          repos={repos}
          itemsPerPage={ITEMS_PER_PAGE}
          numberOfRepos={numberOfRepos}
          changeCurrentPage={changeCurrentPage}
          currentPage={currentPage}
          isFetchingRepos={isFetchingRepos}
          isFetchingUser={isFetchingUser}
        />
      )}
    </div>
  );
};

export default Content;
