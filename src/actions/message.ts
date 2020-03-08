let nextMessageId = 0;

export const addMessage = (text: string) => ({
  type: "ADD_MESSAGE",
  text,
  id: nextMessageId++
});

export const getMessages = () => ({
  type: "GET_MESSAGES"
});

export const getMessage = (id: number) => ({
  type: "GET_MESSAGE",
  id
});

export type MessageType = {
  text: string;
  id: number;
};

export type MessageActions =
  | ReturnType<typeof addMessage>
  | ReturnType<typeof getMessages>
  | ReturnType<typeof getMessage>;
