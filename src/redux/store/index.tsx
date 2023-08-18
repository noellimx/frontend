import { combineReducers } from "redux";

import counter from "./slice/counter";
import SliceAuth from "./slice/auth";
import SliceNotification from "./slice/notification";
import SliceDashboardAll from "./slice/dashboardAll";

export const rootReducer = combineReducers({
  counter: counter.reducer,
  auth: SliceAuth.reducer,
  notification: SliceNotification.reducer,
  dashboardAll: SliceDashboardAll.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
