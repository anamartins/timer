import React from "react";
import ReactDOM from "react-dom";
import DateInput from "/components/date";
import Timer from "/components/timer";

import "./style.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDate: null,
      time: {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.userDate === null && this.state.userDate !== null) {
      this.updateTime();
      setInterval(this.updateTime, 1000);
    }
  }

  updateTime() {
    let diff = this.state.userDate.getTime() - new Date();

    let years = diff / 1000 / 60 / 60 / 24 / 7 / 4 / 12;
    let yearsInt = Math.floor(years);

    let months = (years - yearsInt) * 12;
    let monthsInt = Math.floor(months);

    let weeks = (months - monthsInt) * 4;
    let weeksInt = Math.floor(weeks);

    let days = (weeks - weeksInt) * 7;
    let daysInt = Math.floor(days);

    let hours = (days - daysInt) * 24;
    let hoursInt = Math.floor(hours);

    let minutes = (hours - hoursInt) * 60;
    let minutesInt = Math.floor(minutes);

    let seconds = (minutes - minutesInt) * 60;
    let secondsInt = Math.floor(seconds);

    this.setState({
      time: {
        years: yearsInt,
        months: monthsInt,
        weeks: weeksInt,
        days: daysInt,
        hours: hoursInt,
        minutes: minutesInt,
        seconds: secondsInt
      }
    });
  }

  onDateChange(userDate) {
    this.setState({ userDate: userDate });
  }

  render() {
    return (
      <div className="everything">
        <h1>Quanto tempo falta?</h1>
        <DateInput onDateChange={this.onDateChange} />
        <Timer time={this.state.time} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
