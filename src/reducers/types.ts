import { MessagesState } from "./message";

export type GlobalState = Readonly<{
  messages: MessagesState;
}>;
