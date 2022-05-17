import { AppStateType } from "./store";
import { IRepo, IUser } from "./userSlice";

const user = (state: AppStateType): IUser => state.user.user;
const repos = (state: AppStateType): IRepo[] => state.user.repos;
const searchTerm = (state: AppStateType): string => state.user.searchTerm;
const currentPage = (state: AppStateType): number => state.user.currentPage;
const numberOfRepos = (state: AppStateType): number => state.user.numberOfRepos;
const isFetchingUser = (state: AppStateType): boolean => state.user.isFetchingUser;
const isFetchingRepos = (state: AppStateType): boolean => state.user.isFetchingRepos;
const isError = (state: AppStateType): boolean => state.user.isError;
const isGlobalError = (state: AppStateType): boolean => state.user.isGlobalError;
const isNewUser = (state: AppStateType): boolean => state.user.isNewUser;

export const userSelectors = {
  user,
  repos,
  searchTerm,
  currentPage,
  numberOfRepos,
  isFetchingUser,
  isFetchingRepos,
  isError,
  isGlobalError,
  isNewUser,
};
