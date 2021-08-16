import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";

// CSS
import "./index.css";

import data from "./data/data.json";
// import AutoPart from "./Part";
// import CustomInput from "./CustomForm";

// DONE : On Change display value from user input and use it to compare lifetime
// DONE : If the data contains info key render the information card else don't
// TODO : On hover show information
// TODO : User input should match a number only
// DONE : BUGFIX - Some part are white when the userValue is equal to the avg lifetime car part
class AutoPartsListing extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    value: "",
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const value = this.state.value;
    const autoPart = ({ id, name, lifetime, info }) => {
      const isInfo = info ? <p className="info-text">{info}</p> : <Fragment />;
      const partLife = { good: "#90be6d", worn: "#f8961e", danger: "#f94144" };
      const userKm = value;

      function compareLifetime(initialValue, userValue) {
        if (initialValue <= userValue) {
          return partLife.danger;
        }
        if (
          initialValue > userValue &&
          initialValue - userValue <= initialValue / 2
        ) {
          return partLife.worn;
        }
        if (initialValue > userValue && userValue < initialValue / 2) {
          return partLife.good;
        }
      }
      return (
        <div
          className="autopart-el"
          id={id}
          style={{ backgroundColor: compareLifetime(lifetime, userKm) }}
        >
          <h3>{name}</h3>
          <p>
            <strong>{lifetime}</strong> Km
          </p>
          {isInfo}
        </div>
      );
    };
    const customForm = (
      <fieldset>
        <legend>Entrer son kilométrage</legend>
        <input value={value} onChange={this.handleChange} />
        <p>Mon nombre de kilométrage est de : {value} Km</p>
      </fieldset>
    );
    return (
      <div className="container">
        <h1>AutoLog</h1>
        {customForm}
        <section className="auto-parts-list">
          {data.map((part, index) => {
            console.log(part);
            return autoPart({ ...part });
          })}
        </section>
      </div>
    );
  }
}

ReactDom.render(<AutoPartsListing />, document.getElementById("root"));
