import React from "react";
import { MessageType } from "../actions/message";
import classNames from "classnames";
import UIDs from "./UserIds";

type OwnProps = {
  data?: MessageType;
};

const Message: React.FunctionComponent<OwnProps> = ({ data, children }) => {
  const isUserMessage = data && data.uid === UIDs.user;
  const isCpuMessage = !isUserMessage;

  return (
    <section
      className={classNames("message", isCpuMessage ? "-left" : "-right")}
    >
      {isCpuMessage && <i className="nes-mario"></i>}
      <div
        className={classNames(
          "nes-balloon",
          { "from-left": isCpuMessage },
          { "from-right": isUserMessage }
        )}
      >
        {children}
        {data && <p>{data.text}</p>}
      </div>
      {isUserMessage && <i className="nes-bcrikko"></i>}
    </section>
  );
};

export default Message;
