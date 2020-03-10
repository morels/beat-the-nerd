/**
 * Defines types for the available actions and store related stuff.
 */
import { DispatchProp as DispatchAPI } from "react-redux";

import { MessageActions } from "./message";
import { ApplicationActions } from "./application";

export type Action = ApplicationActions | MessageActions;

export type Dispatch = DispatchAPI<Action>;

export type ReduxProps = Readonly<{
  dispatch: Dispatch;
}>;
