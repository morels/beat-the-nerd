import React from "react";
import { MessageType } from "../actions/message";
import UIDs from "./UserIds";
import { NESMessage } from "./theme/NESMessage";

type OwnProps = {
  data?: MessageType;
};

const Message: React.FunctionComponent<OwnProps> = ({ data, children }) => {
  const isUserMessage = data && data.uid === UIDs.user;
  const isCpuMessage = !isUserMessage;

  return (
    <NESMessage isLeftHanded={isCpuMessage} message={data && data.text}>
      {children}
    </NESMessage>
  );
};

export default Message;
