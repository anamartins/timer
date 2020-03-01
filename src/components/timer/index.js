import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.showTime = this.showTime.bind(this);
  }

  showTime() {
    let p = [];
    // if (this.props.time.years !== 0) {
    //   p.push(
    //     <p key={p.length}>
    //       {this.props.time.years} year{this.props.time.years > 1 ? "s" : null},
    //     </p>
    //   );
    // }
    // if (this.props.time.months !== 0) {
    //   p.push(
    //     <p key={p.length}>
    //       {this.props.time.months} month
    //       {this.props.time.months > 1 ? "s" : ""},
    //     </p>
    //   );
    // }
    // if (this.props.time.weeks !== 0) {
    //   p.push(
    //     <p key={p.length}>
    //       {this.props.time.weeks} week
    //       {this.props.time.weeks > 1 ? "s" : ""},
    //     </p>
    //   );
    // }

    console.log("ó o time", this.props.time);

    if (this.props.time.days !== 0) {
      p.push(
        <p key={p.length}>
          {this.props.time.days} day
          {this.props.time.days > 1 ? "s" : ""},
        </p>
      );
    }

    if (this.props.time.hours !== 0) {
      p.push(
        <p key={p.length}>
          {this.props.time.hours} hour
          {this.props.time.hours > 1 ? "s" : ""},
        </p>
      );
    }

    if (this.props.time.minutes !== 0) {
      p.push(
        <p key={p.length}>
          {this.props.time.minutes} minute
          {this.props.time.minutes > 1 ? "s" : ""}
        </p>
      );
    }

    if (this.props.time.seconds !== 0) {
      p.push(
        <p key={p.length}>
          and {this.props.time.seconds} second
          {this.props.time.seconds > 1 ? "s" : ""}.
        </p>
      );
    }
    return p;
  }

  render() {
    return <div className="timer">{this.showTime()}</div>;
  }
}

Timer.propTypes = {
  time: PropTypes.object
};

export default Timer;
