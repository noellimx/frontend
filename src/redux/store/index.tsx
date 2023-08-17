import { combineReducers } from "redux";

import counter from "./slice/counter";
import SliceAuth from "./slice/auth";
import SliceNotification from "./slice/notification";

export const rootReducer = combineReducers({
  counter: counter.reducer,
  auth: SliceAuth.reducer,
  notification: SliceNotification.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
