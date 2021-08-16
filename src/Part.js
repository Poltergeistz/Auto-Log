import React, { Fragment } from "react";

// DONE : If the data contains info key render the information card else don't
// TODO : On hover show information
const autoPart = ({ id, name, lifetime, info }) => {
  const isInfo = info ? <p className="info-text">{info}</p> : <Fragment />;
  const partLife = { good: "#90be6d", worn: "#f8961e", danger: "#f94144" };
  const userKm = 50000;

  function compareLifetime(initialValue, userValue) {
    if (initialValue < userValue) {
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

export default autoPart;
