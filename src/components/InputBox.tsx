import React from "react";
import { connect } from "react-redux";
import { MyThunkDispatch as Dispatch } from "../actions/message";
import { askQuestion } from "../actions/message";
import { applicationChangeState } from "../actions/application";

type OwnState = {
  message: string;
};

type Props = ReturnType<typeof mapDispatchToProps>;

const INITIAL_STATE = { message: "" };

class InputBox extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
    this.focusedInput = React.createRef();
  }

  focusedInput: React.RefObject<HTMLInputElement> | undefined = undefined;

  componentDidMount() {
    this.props.waitForUserQuestion();
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ message: event.target.value });
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.props.addMessage(this.state.message);
    this.setState(INITIAL_STATE);
    this.focusInputBox();
  }

  private focusInputBox = () => {
    this.focusedInput &&
      this.focusedInput.current &&
      this.focusedInput.current.focus();
  };
  render() {
    const { message } = this.state;

    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "white"
        }}
      >
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            this.handleSubmit(event)
          }
          style={{ display: "flex" }}
        >
          <div className="nes-field" style={{ flex: 1 }}>
            <input
              type="text"
              value={message}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.handleChange(event)
              }
              name="message"
              className="nes-input"
              placeholder="Type your question here"
              ref={this.focusedInput}
            />
          </div>
          <div className="nes-field">
            <input type="submit" value="Send" className="nes-btn is-primary" />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMessage: (message: string) => dispatch(askQuestion(message)),
  waitForUserQuestion: () =>
    dispatch(applicationChangeState("waiting for user question"))
});

export default connect(null, mapDispatchToProps)(InputBox);
