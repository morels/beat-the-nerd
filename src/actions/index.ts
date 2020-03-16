/**
 * Defines types for the available actions and store related stuff.
 */
import { MessageActions } from "./message";
import { ApplicationActions } from "./application";
import { ThunkAction as DefaultThunkAction, ThunkDispatch } from "redux-thunk";
import { GlobalState } from "../reducers/types";

const EXTRA_ARGUMENTS = null;

export type ThunkAction<R> = DefaultThunkAction<R, GlobalState, typeof EXTRA_ARGUMENTS, Action>;

export type Dispatch = ThunkDispatch<GlobalState, typeof EXTRA_ARGUMENTS, Action>;

export type Action = ApplicationActions | MessageActions;

export type ReduxProps = Readonly<{
  dispatch: Dispatch;
}>;
