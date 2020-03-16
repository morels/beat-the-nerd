/**
 * Implements the MessageState reducers.
 *
 * Handles React MessageState changes.
 */

import { Action } from "../actions";
import { MessageType } from "../actions/message";

const NO_MESSAGES: MessageType[] = [];

export type MessagesState = Readonly<MessageType[]>;

export const initialMessagesState: MessagesState = NO_MESSAGES;

const reducer = (
  state: MessagesState = initialMessagesState,
  action: Action
): MessagesState => {
  // export default function messageState(state: [], action: Action): MessagesState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return "text" in action && "uid" in action
        ? [
            ...state,
            {
              text: action.text,
              id: state.length,
              uid: action.uid
            }
          ]
        : [...state];
    case "GET_MESSAGES":
      return [...state];
    default:
      return state;
  }
};

export default reducer;
