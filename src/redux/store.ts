import { useDispatch } from "react-redux";
import { createStore, applyMiddleware, compose, Action } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import rootReducer from "./reducers/index";

export type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: Array<any>) => infer U;
}
  ? U
  : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// export type AppDispatch = typeof store.dispatch;
// export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
