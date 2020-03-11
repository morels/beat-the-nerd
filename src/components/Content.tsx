import React from "react";
import InputBox from "./InputBox";
import MessageList from "./MessageList";

const style = {
  yMargins: {
    marginTop: "2rem",
    marginBottom: "4rem"
  }
};

export default function Content() {
  return (
    <div>
      <MessageList style={style.yMargins} />
      <InputBox />
    </div>
  );
}
