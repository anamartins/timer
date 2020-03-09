import React from "react";
import ReactDOM from "react-dom";
import DateInput from "/components/date";
import Timer from "/components/timer";
import moment from "moment";
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
    let dateFuture = moment(this.state.userDate);
    let datePresent = moment();
    let diff = moment.duration(dateFuture.diff(datePresent));
    let days = diff.days() - diff.weeks() * 7;

    this.setState({
      time: {
        years: diff.years(),
        months: diff.months(),
        weeks: diff.weeks(),
        days: days,
        hours: diff.hours(),
        minutes: diff.minutes(),
        seconds: diff.seconds()
      }
    });
  }

  onDateChange(date) {
    if (date !== "") {
      let userDate = new Date(date);
      this.setState({ userDate: userDate });
      if (moment(date).isValid()) {
        history.replaceState(date, "How much time?", "?date=" + date);
      } else {
        this.setState({ userDate: null });
      }
    } else {
      history.replaceState("", "How much time?", "/");
      this.setState({ userDate: null });
      clearInterval(interval);
    }
  }

  render() {
    return (
      <div className="everything">
        <h1>How much time left?</h1>
        <DateInput
          onDateChange={this.onDateChange}
          knownDate={this.state.userDate}
        />
        {this.state.userDate && <Timer time={this.state.time} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
