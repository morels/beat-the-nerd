import React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers/types";

type Props = ReturnType<typeof mapStateToProps>;

function Message({ data }: { data: string }) {
  return <li>{data}</li>;
}

class MessageList extends React.Component<Props> {
  render() {
    const messages = this.props.messages;

    return (
      <ul>
        {messages.map((m, i) => (
          <Message data={m.text} key={m.id} />
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  messages: state.messages
});

export default connect(mapStateToProps)(MessageList);
