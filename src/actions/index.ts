/**
 * Defines types for the available actions and store related stuff.
 */
import {
  DispatchProp as DispatchAPI,
} from "react-redux";

import { MessageActions } from "./message";

export type Action =
  | MessageActions;

export type Dispatch = DispatchAPI<Action>;

export type ReduxProps = Readonly<{
  dispatch: Dispatch;
}>;
