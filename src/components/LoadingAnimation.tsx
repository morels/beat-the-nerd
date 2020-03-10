import React from "react";

type IntervalID = NodeJS.Timeout;

type OwnState = {
  dots: string;
  intervalID?: IntervalID;
};

type OwnProps = {};

const INITIAL_STATE = {
  dots: ""
};

const DOTS_DELAY = 750; //ms

export default class LoadingAnimation extends React.Component<
  OwnProps,
  OwnState
> {
  constructor(props: OwnProps) {
    super(props);
    this.state = INITIAL_STATE;
    this.maxDots = 3;
  }

  maxDots: number = 3;

  private timer() {
    const newDots =
      this.state.dots.length === this.maxDots ? "" : this.state.dots + ".";

    this.setState({ dots: newDots });
  }

  componentDidMount() {
    const intervalID = setInterval(this.timer.bind(this), DOTS_DELAY);
    this.setState({ intervalID });
  }

  componentWillUnmount() {
    this.state.intervalID && clearInterval(this.state.intervalID);
  }

  render() {
    const { dots } = this.state;
    return <div>{dots}</div>;
  }
}
