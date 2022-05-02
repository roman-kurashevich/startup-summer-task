import { AnyAction } from "redux";
import { getRepos, getUser } from "../../api/users-api";
import { BaseThunkType, InferActionsTypes } from "../store";

const SET_USER = "SET_USER";
const SET_REPOS = "SET_REPOS";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_NUMBER_OF_REPOS = "SET_NUMBER_OF_REPOS";
const TOGGLE_IS_FETCHING_USER = "TOGGLE_IS_FETCHING_USER";
const TOGGLE_IS_FETCHING_REPOS = "TOGGLE_IS_FETCHING_REPOS";
const TOGGLE_IS_ERROR = "TOGGLE_IS_ERROR";
const TOGGLE_IS_NEW_USER = "TOGGLE_IS_NEW_USER";

type UserType = {
  name: string;
  login: string;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
};

type RepoType = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

type InitialState = typeof initialState;

export type ActionsType = InferActionsTypes<typeof actions>;

export type ThunkType = BaseThunkType<ActionsType>;

const initialState = {
  user: {} as UserType,
  repos: [] as Array<RepoType>,
  searchTerm: "",
  currentPage: 0,
  numberOfRepos: 0,
  isFetchingUser: false,
  isFetchingRepos: false,
  isError: false,
  isNewUser: true,
};

const userReducer = (
  state: InitialState = initialState,
  action: ActionsType
): InitialState => {
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

export const actions = {
  setUserAC: (data: UserType) => ({ type: SET_USER, payload: data } as const),

  setReposAC: (data: Array<RepoType>) =>
    ({
      type: SET_REPOS,
      payload: data,
    } as const),

  setSearchTermAC: (searchTerm: string) =>
    ({
      type: SET_SEARCH_TERM,
      payload: searchTerm,
    } as const),

  setCurrentPageAC: (currentPage: number) =>
    ({
      type: SET_CURRENT_PAGE,
      payload: currentPage,
    } as const),

  setNumberOfReposAC: (numberOfRepos: number) =>
    ({
      type: SET_NUMBER_OF_REPOS,
      payload: numberOfRepos,
    } as const),

  toggleIsFetchingUserAC: (isFetchingUser: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING_USER,
      payload: isFetchingUser,
    } as const),

  toggleIsFetchingReposAC: (isFetchingRepos: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING_REPOS,
      payload: isFetchingRepos,
    } as const),

  toggleIsErrorAC: (isError: boolean) =>
    ({
      type: TOGGLE_IS_ERROR,
      payload: isError,
    } as const),

  toggleIsNewUserAC: (isNewUser: boolean) =>
    ({
      type: TOGGLE_IS_NEW_USER,
      payload: isNewUser,
    } as const),
};

export const requestUser = (searchTerm: string): ThunkType => {
  return async (dispatch, getState) => {
    try {
      dispatch(actions.toggleIsFetchingUserAC(true));
      dispatch(actions.setReposAC([]));
      let data = await getUser(searchTerm);
      let user: UserType = {
        name: data.name,
        login: data.login,
        followers: data.followers,
        following: data.following,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
      };
      dispatch(actions.setUserAC(user));
      dispatch(actions.setCurrentPageAC(0));
      dispatch(actions.toggleIsErrorAC(false));
      dispatch(actions.setNumberOfReposAC(data.public_repos));
      dispatch(actions.toggleIsFetchingUserAC(false));
      dispatch(actions.toggleIsNewUserAC(true));

      dispatch(requestRepos(searchTerm, getState().user.currentPage));
    } catch (error: any) {
      if (error.response.status === 404) {
        dispatch(actions.toggleIsErrorAC(true));
        dispatch(actions.toggleIsFetchingUserAC(false));
      }
    }
  };
};

export const requestRepos = (
  searchTerm: string,
  currentPage: number
): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetchingReposAC(true));
    let data = await getRepos(searchTerm, currentPage);
    let repos = [] as Array<RepoType>;
    // map
    data.forEach((item: any) => {
      let repo: RepoType = {
        id: item.id,
        name: item.name,
        description: item.description,
        html_url: item.html_url,
      };
      repos.push(repo);
    });
    dispatch(actions.setReposAC(repos));
    dispatch(actions.toggleIsFetchingReposAC(false));
  };
};

export default userReducer;
