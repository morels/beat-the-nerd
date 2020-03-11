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


  componentDidMount() {
    this.props.greetTheUser();
  }

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  greetTheUser: () =>
    dispatch(
      giveAnswer(
        "Hello! I'm the nerd. Challenge me asking to solve any mathematical operation you want! I'll surprise you..."
      )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
