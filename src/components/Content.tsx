import React from "react";
import InputBox from "./InputBox";
import MessageList from "./MessageList";

export default function Content() {
  return (
    <div>
      <MessageList />
      <InputBox />
    </div>
  );
}
