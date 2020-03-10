import React from "react";
import { connect } from "react-redux";
import { MyThunkDispatch as Dispatch } from "../actions/message";
import { askQuestion } from "../actions/message";

type OwnState = {
  message: string;
};

type Props = ReturnType<typeof mapDispatchToProps>;

const INITIAL_STATE = { message: "" };

class InputBox extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ message: event.target.value });
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.props.addMessage(this.state.message);
    this.setState(INITIAL_STATE);
  }

  render() {
    const { message } = this.state;

    return (
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            this.handleSubmit(event)
          }
          style={{ display: "flex" }}
        >
          <input
            type="text"
            value={message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              this.handleChange(event)
            }
            name="message"
            style={{ flex: 1 }}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMessage: (message: string) => dispatch(askQuestion(message))
});

export default connect(null, mapDispatchToProps)(InputBox);
