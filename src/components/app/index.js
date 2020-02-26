import React from "react";
import ReactDOM from "react-dom";
import DateInput from "/components/date";

import "./style.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };

    this.getDateDiff = this.getDateDiff.bind(this);
  }

  getDateDiff(userDate) {
    console.log("userDate", userDate);
    console.log("userDAte getTime", userDate.getTime());
    console.log("c", this.state.currentDate);
    console.log("c get Time", this.state.currentDate.getTime());
    let diff = userDate.getTime() - this.state.currentDate.getTime();
    console.log("diff", diff);
    console.log("seconds: ", diff / 1000);
    console.log("minutes: ", diff / 1000 / 60);
    console.log("hours: ", diff / 1000 / 60 / 60);
    console.log("days: ", diff / 1000 / 60 / 60 / 24);
    console.log("weeks: ", diff / 1000 / 60 / 60 / 24 / 7);
    console.log("months: ", diff / 1000 / 60 / 60 / 24 / 7 / 4);
    console.log("years: ", diff / 1000 / 60 / 60 / 24 / 7 / 4 / 12);
  }

  render() {
    return (
      <div className="everything">
        <h1>Quanto tempo falta?</h1>
        <DateInput onDateChange={this.getDateDiff} />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
