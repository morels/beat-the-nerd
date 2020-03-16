import React from "react";
import Content from "./Content";
import { connect } from "react-redux";
import { MyThunkDispatch as Dispatch } from "../actions/message";
import { startApplication } from "../actions/application";

type OwnProps = ReturnType<typeof mapDispatchToProps>;

function Header() {
  return (
    <header>
      <div
        style={{
          margin: "1rem 0",
          textAlign: "center",
          borderBottom: "2px solid black"
        }}
      >
        <h1>Beat the Nerd</h1>
      </div>
    </header>
  );
}

class App extends React.Component<OwnProps> {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startApplication: () => dispatch(startApplication())
});

export default connect(mapDispatchToProps)(App);
