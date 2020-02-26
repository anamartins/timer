import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const CURRENT_DATE = new Date();

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let userDate = event.target.value;
    userDate = new Date(userDate);
    this.props.onDateChange(userDate);
  }

  render() {
    return (
      <div className="date">
        <label htmlFor="date">Qual é a data que você quer lembrar?</label>
        <input
          id="date"
          type="datetime-local"
          min={CURRENT_DATE}
          onChange={this.onChange}
        ></input>
      </div>
    );
  }
}

DateInput.propTypes = {
  onDateChange: PropTypes.func
};

export default DateInput;
