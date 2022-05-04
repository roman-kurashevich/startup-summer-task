import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getRepos, getUser } from "../api/users-api";

//interface or type
//maybe UserStateType?
type InitialStateType = {
  user: UserType;
  repos: Array<RepoType>;
  searchTerm: string;
  currentPage: number;
  numberOfRepos: number;
  isFetchingUser: boolean;
  isFetchingRepos: boolean;
  isError: boolean;
  isGlobalError: boolean;
  isNewUser: boolean;
};

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

type RequestReposParamsType = {
  searchTerm: string;
  currentPage: number;
};

const initialState: InitialStateType = {
  user: {} as UserType,
  repos: [] as Array<RepoType>,
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
  async (searchTerm: string, { rejectWithValue, dispatch, getState }) => {
    try {
      let data = await getUser(searchTerm);
      let user: UserType = {
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
      dispatch(toggleIsNewUser(true));

      dispatch(
        requestRepos({ searchTerm, currentPage: 0 }) // getState().user.currentPage
      );
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const requestRepos = createAsyncThunk(
  "user/requestRepos",
  async (parameters: RequestReposParamsType, { rejectWithValue, dispatch }) => {
    const { searchTerm, currentPage } = parameters;
    let data = await getRepos(searchTerm, currentPage);
    let repos = [] as Array<RepoType>;
    data.map((item: any) => {
      let repo: RepoType = {
        id: item.id,
        name: item.name,
        description: item.description,
        html_url: item.html_url,
      };
      repos.push(repo);
    });
    dispatch(setRepos(repos));
  }
);

const userSlice = createSlice({
  name: "user",
  initialState, //?
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setRepos: (state, action: PayloadAction<Array<RepoType>>) => {
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
    [requestUser.fulfilled.type]: () => {},
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
        console.log("GLOBAL ERROR");
        state.isGlobalError = true;
      }
    },
    [requestRepos.fulfilled.type]: (state) => {
      state.isFetchingRepos = false;
    },
    [requestRepos.pending.type]: (state) => {
      state.isFetchingRepos = true;
    },
    [requestRepos.rejected.type]: () => {
      console.log("Fetching repos error");
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
