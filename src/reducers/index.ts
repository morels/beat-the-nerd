import { combineReducers } from "redux";
import messageReducer from "./message";
import { GlobalState } from "./types";
import { Action } from "../actions";

export default combineReducers<GlobalState, Action>({
  messages: messageReducer
});
