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
    let time = this.props.time;
    let { years, months, weeks, days, hours, minutes, seconds } = time;
    if (years !== 0) {
      p.push(
        <p key={p.length}>
          {years} year{years > 1 ? "s" : null},
        </p>
      );
    }
    if (months !== 0) {
      p.push(
        <p key={p.length}>
          {months} month
          {months > 1 ? "s" : ""},
        </p>
      );
    }

    if (weeks !== 0) {
      p.push(
        <p key={p.length}>
          {weeks} week
          {weeks > 1 ? "s" : ""},
        </p>
      );
    }

    if (days !== 0) {
      p.push(
        <p key={p.length}>
          {days} day
          {days > 1 ? "s" : ""},
        </p>
      );
    }

    if (hours !== 0) {
      p.push(
        <p key={p.length}>
          {hours} hour
          {hours > 1 ? "s" : ""},
        </p>
      );
    }

    if (minutes !== 0) {
      p.push(
        <p key={p.length}>
          {minutes} minute
          {minutes > 1 ? "s" : ""}
        </p>
      );
    }

    if (seconds !== 0) {
      p.push(
        <p key={p.length}>
          and {seconds} second
          {seconds > 1 ? "s" : ""}.
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
