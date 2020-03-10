import { ApplicationState } from "../actions/application";

/**
 * Implements the ApplicationState reducer.
 *
 * Handles React ApplicationState changes.
 */
export type AppState = Readonly<{
  appState: ApplicationState;
}>;

export const initialAppState: AppState = {
  appState: "waiting for user question"
};

// FIXME: any fix
const reducer = (state: AppState = initialAppState, action: any): AppState => {
  // export default function messageState(state: [], action: Action): MessagesState {
  switch (action.type) {
    case "APP_STATE_CHANGE":
      return {
        ...state,
        appState: action.payload
      };
    case "APPLICATION_START":
      return initialAppState;
    default:
      return state;
  }
};

export default reducer;
