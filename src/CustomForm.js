import React, { Component } from "react";

// DONE : Display the km when a user type without validating
// TODO : Grab the value from the input and compare for each lifetime key

class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    value: "",
  };

  static propsTypes = {};

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  // TODO : User input should match a number only

  // TODO : Store Value to props to compare with lifetime car part

  /*  valueShouldBeANum(value) {
    if (typeof value !== "number") {
      return "error";
    } else {
      this.setState({ value });
      return value;
    }
  } */

  render() {
    const value = this.state.value;
    return (
      <fieldset>
        <legend>Entrer son kilométrage</legend>
        <input value={value} onChange={this.handleChange} />
        <p>Mon nombre de kilométrage est de : {value} Km</p>
      </fieldset>
    );
  }
}

export default CustomInput;
