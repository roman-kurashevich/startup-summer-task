import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;
export default store;
