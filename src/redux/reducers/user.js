import { getRepos, getUser } from "../../api/users-api";

const SET_USER = "SET_USER";
const SET_REPOS = "SET_REPOS";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_NUMBER_OF_REPOS = "SET_NUMBER_OF_REPOS";
const TOGGLE_IS_FETCHING_USER = "TOGGLE_IS_FETCHING_USER";
const TOGGLE_IS_FETCHING_REPOS = "TOGGLE_IS_FETCHING_REPOS";
const TOGGLE_IS_ERROR = "TOGGLE_IS_ERROR";
const TOGGLE_IS_NEW_USER = "TOGGLE_IS_NEW_USER";

const initialState = {
  user: {},
  repos: [],
  searchTerm: "",
  currentPage: 0,
  numberOfRepos: 0,
  isFetchingUser: false,
  isFetchingRepos: false,
  isError: false,
  isNewUser: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_REPOS:
      return {
        ...state,
        repos: action.payload,
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case SET_NUMBER_OF_REPOS:
      return {
        ...state,
        numberOfRepos: action.payload,
      };

    case TOGGLE_IS_FETCHING_USER:
      return {
        ...state,
        isFetchingUser: action.payload,
      };

    case TOGGLE_IS_FETCHING_REPOS:
      return {
        ...state,
        isFetchingRepos: action.payload,
      };

    case TOGGLE_IS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };

    case TOGGLE_IS_NEW_USER:
      return {
        ...state,
        isNewUser: action.payload,
      };

    default:
      return state;
  }
};

const setUserAC = (data) => ({ type: SET_USER, payload: data });

const setReposAC = (data) => ({ type: SET_REPOS, payload: data });

export const setSearchTermAC = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
});

const setNumberOfReposAC = (numberOfRepos) => ({
  type: SET_NUMBER_OF_REPOS,
  payload: numberOfRepos,
});

const toggleIsFetchingUserAC = (isFetchingUser) => ({
  type: TOGGLE_IS_FETCHING_USER,
  payload: isFetchingUser,
});

const toggleIsFetchingReposAC = (isFetchingRepos) => ({
  type: TOGGLE_IS_FETCHING_REPOS,
  payload: isFetchingRepos,
});

const toggleIsErrorAC = (isError) => ({
  type: TOGGLE_IS_ERROR,
  payload: isError,
});

export const toggleIsNewUserAC = (isNewUser) => ({
  type: TOGGLE_IS_NEW_USER,
  payload: isNewUser,
});

export const requestUser = (searchTerm, currentPage) => {
  return async (dispatch) => {
    try {
      dispatch(toggleIsFetchingUserAC(true));
      let data = await getUser(searchTerm);
      dispatch(setUserAC(data));
      dispatch(setCurrentPageAC(0));
      dispatch(toggleIsErrorAC(false));
      dispatch(setNumberOfReposAC(data.public_repos));
      dispatch(toggleIsFetchingUserAC(false));
      dispatch(toggleIsNewUserAC(true));

      dispatch(requestRepos(searchTerm, currentPage));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(toggleIsErrorAC(true));
        dispatch(toggleIsFetchingUserAC(false));
      }
    }
  };
};

export const requestRepos = (searchTerm, currentPage) => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingReposAC(true));
    let data = await getRepos(searchTerm, currentPage);
    dispatch(setReposAC(data));
    dispatch(toggleIsFetchingReposAC(false));
  };
};

export default userReducer;
