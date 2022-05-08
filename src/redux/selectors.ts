import { AppStateType } from "./store";
import { IRepo, IUser } from "./userSlice";

export const user = (state: AppStateType): IUser => state.user.user;
export const repos = (state: AppStateType): IRepo[] => state.user.repos;
export const searchTerm = (state: AppStateType): string => state.user.searchTerm;
export const currentPage = (state: AppStateType): number => state.user.currentPage;
export const numberOfRepos = (state: AppStateType): number => state.user.numberOfRepos;
export const isFetchingUser = (state: AppStateType): boolean => state.user.isFetchingUser;
export const isFetchingRepos = (state: AppStateType): boolean => state.user.isFetchingRepos;
export const isError = (state: AppStateType): boolean => state.user.isError;
export const isGlobalError = (state: AppStateType): boolean => state.user.isGlobalError;
export const isNewUser = (state: AppStateType): boolean => state.user.isNewUser;
