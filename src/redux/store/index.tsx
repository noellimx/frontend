import { combineReducers } from "redux";

import counter from "./slice/counter";
import SliceAuth from "./slice/auth";

export const rootReducer = combineReducers({
  counter: counter.reducer,
  auth: SliceAuth.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
