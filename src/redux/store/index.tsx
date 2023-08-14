import { combineReducers } from "redux";
import counter from "./counter/slice";

export const rootReducer = combineReducers({
  counter: counter,
});
