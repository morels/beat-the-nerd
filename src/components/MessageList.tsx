import React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers/types";
import LoadingAnimation from "./LoadingAnimation";
import { MessageType } from "../actions/message";
import classNames from "classnames";
import UIDs from "./UserIds";

type OwnProps = { style?: React.CSSProperties };

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

type MessageProps = {
  data?: MessageType;
};

const Message: React.FunctionComponent<MessageProps> = ({ data, children }) => {
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

class MessageList extends React.Component<Props> {
  render() {
    const messages = this.props.messages;

    return (
      <section className="nes-container with-title" style={this.props.style}>
        <p className="title">Messages</p>
        <section className="message-list">
          {messages.map((m, i) => (
            <Message data={m} key={m.id} />
          ))}
          {this.props.isCPUAnswering && (
            <Message>
              <LoadingAnimation />
            </Message>
          )}
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  messages: state.messages,
  isCPUAnswering: state.application.appState === "answering the user"
});

export default connect(mapStateToProps)(MessageList);
