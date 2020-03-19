import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "../actions";
import { askQuestion } from "../actions/message";
import { applicationChangeState } from "../actions/application";
import { NESField } from "./theme/NESField";
import { NESFormWrapper } from "./theme/NESFormWrapper";
import { NESInputText } from "./theme/NESInputText";
import { NESSubmitButton } from "./theme/NESSubmitButton";

type OwnState = {
  message: string;
};

type OwnProps = ReturnType<typeof mapDispatchToProps>;

const INITIAL_STATE = { message: "" };

const styles: { [key: string]: React.CSSProperties } = {
  formWrapper: {
    position: "fixed",
    bottom: 0
  },
  form: { display: "flex" },
  inputTextWrapper: { flex: 1 }
};

class InputBox extends React.Component<OwnProps, OwnState> {
  constructor(props: OwnProps) {
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
      <NESFormWrapper style={styles.formWrapper}>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            this.handleSubmit(event)
          }
          style={styles.form}
        >
          <NESField style={styles.inputTextWrapper}>
            <NESInputText
              value={message}
              placeholder="Type your question here"
              name="message"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                this.handleChange(event)
              }
              ref={this.focusedInput}
            />
          </NESField>
          <NESField>
            <NESSubmitButton value="Send" primary={true} />
          </NESField>
        </form>
      </NESFormWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMessage: (message: string) => dispatch(askQuestion(message)),
  waitForUserQuestion: () =>
    dispatch(applicationChangeState("waiting for user question"))
});

export default connect(null, mapDispatchToProps)(InputBox);
