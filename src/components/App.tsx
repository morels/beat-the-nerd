import React from "react";
import Content from "./Content";
import { connect } from "react-redux";
import { Dispatch } from "../actions";
import { startApplication } from "../actions/application";
import { Header } from "./theme/Header";

type OwnProps = ReturnType<typeof mapDispatchToProps>;

class App extends React.Component<OwnProps> {
  render() {
    return (
      <div>
        <Header title="Beat the Nerd" />
        <Content />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startApplication: () => dispatch(startApplication())
});

export default connect(mapDispatchToProps)(App);
