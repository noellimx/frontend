import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { rootReducer } from "./redux/store/index.tsx";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaults) => getDefaults().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
