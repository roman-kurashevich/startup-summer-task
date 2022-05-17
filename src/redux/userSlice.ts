import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getRepos, getUser } from "../api/users-api";

type IUserState = {
  user: IUser;
  repos: Array<IRepo>;
  searchTerm: string;
  currentPage: number;
  numberOfRepos: number;
  isFetchingUser: boolean;
  isFetchingRepos: boolean;
  isError: boolean;
  isGlobalError: boolean;
  isNewUser: boolean;
};

export type IUser = {
  name: string;
  login: string;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
};

export type IRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

type IRequestReposParams = {
  searchTerm: string;
  currentPage: number;
};

const initialState: IUserState = {
  user: {} as IUser,
  repos: [] as Array<IRepo>,
  searchTerm: "",
  currentPage: 0,
  numberOfRepos: 0,
  isFetchingUser: false,
  isFetchingRepos: false,
  isError: false,
  isGlobalError: false,
  isNewUser: true,
};

export const requestUser = createAsyncThunk(
  "user/requestUser",
  async (searchTerm: string, { rejectWithValue, dispatch }) => {
    try {
      const data = await getUser(searchTerm);
      const user: IUser = {
        name: data.name,
        login: data.login,
        followers: data.followers,
        following: data.following,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
      };
      dispatch(setUser(user));
      dispatch(setCurrentPage(0));
      dispatch(toggleIsError(false));
      dispatch(setNumberOfRepos(data.public_repos));
      dispatch(toggleIsFetchingUser(false));
      dispatch(requestRepos({ searchTerm, currentPage: 0 }));
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const requestRepos = createAsyncThunk(
  "user/requestRepos",
  async (parameters: IRequestReposParams, { rejectWithValue, dispatch }) => {
    try {
      const { searchTerm, currentPage } = parameters;
      const data = await getRepos(searchTerm, currentPage);
      const repos: IRepo[] = data.map((repoItem: Record<string, any>) => {
        return {
          id: repoItem.id,
          name: repoItem.name,
          description: repoItem.description,
          html_url: repoItem.html_url,
        };
      });
      dispatch(setRepos(repos));
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setRepos: (state, action: PayloadAction<Array<IRepo>>) => {
      state.repos = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setNumberOfRepos: (state, action: PayloadAction<number>) => {
      state.numberOfRepos = action.payload;
    },
    toggleIsNewUser: (state, action: PayloadAction<boolean>) => {
      state.isNewUser = action.payload;
    },
    toggleIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    toggleIsGlobalError: (state, action: PayloadAction<boolean>) => {
      state.isGlobalError = action.payload;
    },
    toggleIsFetchingUser: (state, action: PayloadAction<boolean>) => {
      state.isFetchingUser = action.payload;
    },
    toggleIsFetchingRepos: (state, action: PayloadAction<boolean>) => {
      state.isFetchingRepos = action.payload;
    },
  },
  extraReducers: {
    [requestUser.pending.type]: (state) => {
      state.isGlobalError = false;
      state.isFetchingUser = true;
      state.repos = [];
    },
    [requestUser.rejected.type]: (state, action) => {
      if (action.payload === 404) {
        state.isError = true;
        state.isFetchingUser = false;
      } else {
        state.isGlobalError = true;
      }
    },
    [requestRepos.fulfilled.type]: (state) => {
      state.isFetchingRepos = false;
    },
    [requestRepos.pending.type]: (state) => {
      state.isFetchingRepos = true;
    },
    [requestRepos.rejected.type]: (state) => {
      state.isGlobalError = true;
    },
  },
});

export const {
  setUser,
  setRepos,
  setSearchTerm,
  setCurrentPage,
  setNumberOfRepos,
  toggleIsNewUser,
  toggleIsError,
  toggleIsFetchingUser,
  toggleIsFetchingRepos,
} = userSlice.actions;

export default userSlice.reducer;
