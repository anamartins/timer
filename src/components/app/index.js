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

    if (date !== null) {
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
    let dateFuture = this.state.userDate;
    let datePresent = new Date();

    let years = dateFuture.getFullYear() - datePresent.getFullYear();

    // let years = diff / 1000 / 60 / 60 / 24 / 7 / 4 / 12;
    // let yearsInt = Math.floor(years);

    let months = years * 12 + (dateFuture.getMonth() - datePresent.getMonth());
    let dayPresent = datePresent.getDate();
    let dayFuture = dateFuture.getDate();
    let dayDiff = dayFuture - dayPresent;

    if (dayDiff < 0 && months !== 0) {
      console.log("negativo");
      if (months % 12 === 0) {
        console.log("monhts", months % 12);
        years -= 1;
        console.log("years", years);
        months = months - years * 12 - 1;
      }
    }

    if (months % 12 === 0) {
      months = months - years * 12;
    }

    if (months > 12) {
      years = Math.floor(months / 12);
      months = months % 12;
    }

    let diff = dateFuture.getTime() - datePresent;
    let days = diff / 1000 / 60 / 60 / 24;
    let daysInt = Math.floor(days);
    let daysMinus;
    if (years > 0) {
      //   console.log("years", years);
      //   console.log("years%4", years % 4);
      //   console.log("years%4 + 1", (years + 1) % 4);
      //   console.log("years/4 trunc", Math.trunc((years + 1) / 4));
      //   console.log("years/4", (years + 1) / 4);

      if (years % 4 === 0) {
        //multiple of 4
        daysMinus = years * 1461;
      }
      if (years % 4 === 1) {
        if (datePresent.getFullYear() % 4 === 0) {
          // we are in a leap year on the present
          if (datePresent.getMonth < 1) {
            // we do not arrive on feb 29
          }
        }
      }
    }

    let hours = (days - daysInt) * 24;
    let hoursInt = Math.floor(hours);

    let minutes = (hours - hoursInt) * 60;
    let minutesInt = Math.floor(minutes);

    let seconds = (minutes - minutesInt) * 60;
    let secondsInt = Math.floor(seconds);

    this.setState({
      time: {
        years: years,
        months: months,
        weeks: 0,
        days: daysInt,
        hours: hoursInt,
        minutes: minutesInt,
        seconds: secondsInt
      }
    });
  }

  onDateChange(userDate) {
    this.setState({ userDate: userDate });
    if (userDate === null) {
      clearInterval(interval);
    }
  }

  changeURL(userDate) {
    let date = userDate;

    if (date !== "") {
      userDate = new Date(userDate);
      this.onDateChange(userDate);
      history.replaceState(date, "Quanto tempo falta?", "?date=" + date);
    } else {
      history.replaceState("", "Quanto tempo falta?", "/");
      this.onDateChange(null);
    }
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
