import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const CURRENT_DATE = new Date();

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProp) {
    if (
      prevProp.knownDate !== this.props.knownDate &&
      this.props.knownDate !== null
    ) {
      let day = this.props.knownDate.getDate();
      let month = this.props.knownDate.getMonth() + 1;
      let year = this.props.knownDate.getFullYear();
      let hour = this.props.knownDate.getHours();
      let minute = this.props.knownDate.getMinutes();

      day = this.standardizeDate(day);
      month = this.standardizeDate(month);
      year = this.standardizeDate(year);
      hour = this.standardizeDate(hour);
      minute = this.standardizeDate(minute);

      let fullDate = year + "-" + month + "-" + day + "T" + hour + ":" + minute;

      this.setState({
        value: fullDate
      });
    }
  }

  standardizeDate(number) {
    let item = number.toString();
    return item.padStart(2, "0");
  }

  onChange(event) {
    this.setState({ value: event.target.value });
    this.props.changeURL(event.target.value);
  }

  render() {
    return (
      <div className="date">
        <label htmlFor="date">Qual é a data que você quer lembrar?</label>
        <input
          id="date"
          type="datetime-local"
          min={this.CURRENT_DATE}
          onChange={this.onChange}
          value={this.state.value}
        ></input>
      </div>
    );
  }
}

DateInput.propTypes = {
  onDateChange: PropTypes.func,
  changeURL: PropTypes.func,
  knownDate: PropTypes.instanceOf(Date)
};

export default DateInput;
