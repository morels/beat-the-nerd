/**
 * Action types and action creator related to the Application.
 */

export const startApplication = () => ({
  type: "APPLICATION_START"
});

export type ApplicationState =
  | "greeting"
  | "waiting for user question"
  | "answering the user"
  | "searching fun fact";

export const applicationChangeState = (payload: ApplicationState) => ({
  type: "APP_STATE_CHANGE",
  payload
});

export type ApplicationActions =
  | ReturnType<typeof startApplication>
  | ReturnType<typeof applicationChangeState>;
