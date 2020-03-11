import React from "react";
import { connect } from "react-redux";
import { GlobalState } from "../reducers/types";
import LoadingAnimation from "./LoadingAnimation";
import { giveAnswer } from "../actions/message";
import { MyThunkDispatch as Dispatch } from "../actions/message";
import Message from "./Message";

type OwnProps = { style?: React.CSSProperties };

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

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
        <div ref={this.messagesEndlineRef}></div>
      </section>
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
