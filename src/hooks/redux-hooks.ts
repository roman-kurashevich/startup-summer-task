import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, AppStateType } from "../redux/store";

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
