import React from "react";
import ReactDOM from "react-dom";
import DateInput from "/components/date";
import Timer from "/components/timer";

import "./style.scss";

let interval;

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
    this.changeURL = this.changeURL.bind(this);
  }

  componentDidMount() {
    let url = new URL(window.location.toString());
    let param = new URLSearchParams(url.search);
    let date = param.get("date");

    console.log("url app did mount: ", url);
    console.log("param app did mount: ", url.search);
    console.log("date: app did mount ", date);

    console.log("tipo de date", typeof date);

    if (date !== null) {
      console.log("entrou no if");
      this.onDateChange(new Date(date));
    }
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.userDate === null && this.state.userDate !== null) {
      this.updateTime();
      interval = setInterval(this.updateTime, 1000);
    }
  }

  updateTime() {
    let diff = this.state.userDate.getTime() - new Date();

    // let years = diff / 1000 / 60 / 60 / 24 / 7 / 4 / 12;
    // let yearsInt = Math.floor(years);

    // let months = (years - yearsInt) * 12;
    // let monthsInt = Math.floor(months);

    // let weeks = (months - monthsInt) * 4;
    // let weeksInt = Math.floor(weeks);

    let days = diff / 1000 / 60 / 60 / 24;
    // let days = (weeks - weeksInt) * 7;
    let daysInt = Math.floor(days);

    let hours = (days - daysInt) * 24;
    let hoursInt = Math.floor(hours);

    let minutes = (hours - hoursInt) * 60;
    let minutesInt = Math.floor(minutes);

    let seconds = (minutes - minutesInt) * 60;
    let secondsInt = Math.floor(seconds);

    this.setState({
      time: {
        // years: yearsInt,
        // months: monthsInt,
        // weeks: weeksInt,
        days: daysInt,
        hours: hoursInt,
        minutes: minutesInt,
        seconds: secondsInt
      }
    });
  }

  onDateChange(userDate) {
    this.setState({ userDate: userDate });
    console.log("userdate on change date: ", userDate);
    if (userDate === null) {
      clearInterval(interval);
    }
  }

  changeURL(userDate) {
    let date = userDate;

    if (date !== "") {
      userDate = new Date(userDate);
      this.onDateChange(userDate);
      console.log("date changeURL", date);
      console.log("userdate changeURL", userDate);
      history.replaceState(date, "Quanto tempo falta?", "?date=" + date);
    } else {
      console.log("date null!");
      history.replaceState("", "Quanto tempo falta?", "/");
      this.onDateChange(null);
    }

    // this.onDateChange(userDate);
    // history.replaceState(date, "Quanto tempo falta?", "?date=" + date.userDate);
  }

  render() {
    return (
      <div className="everything">
        <h1>Quanto tempo falta?</h1>
        <DateInput
          onDateChange={this.onDateChange}
          knownDate={this.state.userDate}
          changeURL={this.changeURL}
        />
        {this.state.userDate && <Timer time={this.state.time} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
