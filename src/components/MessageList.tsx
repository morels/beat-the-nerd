import React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers/types";
import LoadingAnimation from "./LoadingAnimation";
import { giveAnswer } from "../actions/message";
import { Dispatch } from "../actions";
import Message from "./Message";
import { NESMessageList } from "./theme/NESMessageList";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const style: React.CSSProperties = {
  marginTop: "2rem",
  marginBottom: "4rem"
};

class MessageList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.messagesEndlineRef = React.createRef();
  }

  messagesEndlineRef: React.RefObject<HTMLDivElement> | undefined = undefined;

  componentDidMount() {
    this.props.greetTheUser();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  private scrollToBottom = () => {
    this.messagesEndlineRef &&
      this.messagesEndlineRef.current &&
      this.messagesEndlineRef.current.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const messages = this.props.messages;

    return (
      <NESMessageList
        ref={this.messagesEndlineRef}
        style={style}
        title="Messages"
      >
        {messages.map((m, i) => (
          <Message data={m} key={m.id} />
        ))}
        {this.props.isCPUAnswering && (
          <Message>
            <LoadingAnimation />
          </Message>
        )}
      </NESMessageList>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  messages: state.messages,
  isCPUAnswering:
    state.application.appState === "answering the user" ||
    state.application.appState === "searching fun fact"
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  greetTheUser: () =>
    dispatch(
      giveAnswer(
        "Hello! I'm the nerd. Challenge me asking to solve any mathematical operation you want! I'll surprise you..."
      )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
