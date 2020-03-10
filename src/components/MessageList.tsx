import React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers/types";
import LoadingAnimation from "./LoadingAnimation";

type Props = ReturnType<typeof mapStateToProps>;

function Message({ data }: { data: string }) {
  return <li>{data}</li>;
}

class MessageList extends React.Component<Props> {
  render() {
    const messages = this.props.messages;

    return (
      <div>
        <ul>
          {messages.map((m, i) => (
            <Message data={m.text} key={m.id} />
          ))}
        </ul>
        {this.props.isCPUAnswering && <LoadingAnimation />}
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  messages: state.messages,
  isCPUAnswering: state.application.appState === "answering the user"
});

export default connect(mapStateToProps)(MessageList);
