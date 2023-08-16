import { combineReducers } from "redux";

import counter from "./counter";
import authSlice from "./auth";

export const rootReducer = combineReducers({
  counter: counter.reducer,
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
