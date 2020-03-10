import { MessagesState } from "./message";
import { AppState } from "./application";

export type GlobalState = Readonly<{
  messages: MessagesState;
  application: AppState;
}>;
