import React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers/types";

type Props = ReturnType<typeof mapStateToProps>;

function Message({ data, key }: { data: string; key: number }) {
  return <li key={key}>{data}</li>;
}

class MessageList extends React.Component<Props> {

  render() {
    const messages = this.props.messages;

    return (
      <ul>
        {messages.map((m, i) => (
          <Message data={m.text} key={i} />
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  messages: state.messages
});

export default connect(mapStateToProps)(MessageList);
