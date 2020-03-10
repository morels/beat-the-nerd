import UIDs from "../components/UserIds";
import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { initialMessagesState } from "../reducers/message";
import QueryAPIBuilder, { QueryAPIResponse } from "../components/QueryAPI";

type MyRootState = typeof initialMessagesState;
type MyExtraArg = undefined;
type MyThunkResult<R> = ThunkAction<R, MyRootState, MyExtraArg, Action>;
// Next Line:
// It is important to use Action as last type argument, does not work with any.
export type MyThunkDispatch = ThunkDispatch<MyRootState, MyExtraArg, Action>;

let nextMessageId = 0;

export const addMessage = (text: string, uid: number) => ({
  type: "ADD_MESSAGE",
  text,
  id: nextMessageId++,
  uid
});

export const getMessages = () => ({
  type: "GET_MESSAGES"
});

export const getMessage = (id: number) => ({
  type: "GET_MESSAGE",
  id
});

const fetchAnswer = (question: string): Promise<string> => {
  return fetch(QueryAPIBuilder.build(question))
    .then((response: Response) => response.json())
    .then((response: QueryAPIResponse) => response.result);
};

export const askQuestion = (message: string): MyThunkResult<Promise<void>> => {
  return async (dispatch: MyThunkDispatch): Promise<void> => {
    dispatch(addMessage(message, UIDs.user));
    const answer = await fetchAnswer(message);
    dispatch(addMessage(answer, UIDs.cpu));
  };
};

export type MessageType = {
  text: string;
  id: number;
};

export type MessageActions =
  | ReturnType<typeof addMessage>
  | ReturnType<typeof getMessages>
  | ReturnType<typeof getMessage>;
