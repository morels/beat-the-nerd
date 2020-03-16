import { ApplicationState } from "../actions/application";
import { Action } from "../actions";

/**
 * Implements the ApplicationState reducer.
 *
 * Handles React ApplicationState changes.
 */
export type AppState = Readonly<{
  appState: ApplicationState;
}>;

export const initialAppState: AppState = {
  appState: "greeting"
};

const reducer = (
  state: AppState = initialAppState,
  action: Action
): AppState => {
  switch (action.type) {
    case "APP_STATE_CHANGE":
      return "payload" in action
        ? {
            ...state,
            appState: action.payload
          }
        : {
            ...state
          };
    case "APPLICATION_START":
      return initialAppState;
    default:
      return state;
  }
};

export default reducer;
