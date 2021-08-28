import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";

// CSS
import "./assets/index.css";

import data from "./data/data.json";

// DONE : On Change display value from user input and use it to compare lifetime
// DONE : If the data contains info key render the information card else don't
// DONE : On hover show information
// DONE : User input should match a number only
// DONE : BUGFIX - Some part are white when the userValue is equal to the avg lifetime car part
// DONE : Problem to Fix : Tailwindcss does not handle <Progress> styling, find an elegant solution
// TODO : Designing the app minimal and responsive
// TODO : Error handling for UX
class AutoLogApp extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    value: "",
  };

  handleChange(e) {
    // User input check should happen here
    function userInputShouldBeANum(userInput) {
      const parsedInput = parseInt(userInput);
      const isNum = Boolean(!isNaN(parsedInput)) ? parsedInput : "";
      return isNum;
    }

    // replace the target.value with the expected input : Number only
    this.setState({ value: userInputShouldBeANum(e.target.value) });
  }

  render() {
    const value = this.state.value;
    const autoPart = ({ id, name, lifetime, info }) => {
      const isInfo = info ? (
        <div className="flex p-2 text-justify justify-center items-center space-x-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="flex-none fill-current text-gray-800 h-8 w-8 self-center"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z" />
          </svg>
          <p className="font-light text-sm ">{info}</p>
        </div>
      ) : (
        <Fragment />
      );
      const partLife = { good: "#90be6d", worn: "#f8961e", danger: "#f94144" };

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

      function valueIntoPercent(v, vmax) {
        let result = Math.floor((v / vmax) * 100);
        return result + "%";
      }
      return (
        <div className="">
          <div
            className="bg-white max-w-xs shadow-lg  mx-auto rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer"
            id={id}
            style={{ backgroundColor: compareLifetime(lifetime, value) }}
          >
            <div
              className="flex flex-col h-28 justify-center items-center bg-cover bg-opacity-40"
              style={{ backgroundImage: "url(https://picsum.photos/200)" }}
            >
              <h2 className="text-black tracking-widest uppercase text-sm">
                {name}
              </h2>
              <p className="text-black font-bold text-xl">
                {lifetime.toLocaleString()} KM
              </p>
              <div className="mt-2 h-4 relative w-60 rounded-full overflow-hidden">
                <div className=" w-full h-full bg-white absolute "></div>
                <div
                  className=" h-full bg-gradient-to-r from-green-400 via-yellow-500 to-red-700 sm:bg-green-500 absolute"
                  style={{ width: valueIntoPercent(value, lifetime) }}
                ></div>
              </div>
              <div className="text-xs font-light italic">
                {value.toLocaleString()}/{lifetime.toLocaleString()}
              </div>
            </div>
            <div className="flex px-4 h-24">{isInfo}</div>
          </div>
        </div>
      );
    };
    const customForm = (
      <fieldset className="p-4 text-center bg-indigo-500 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
        <legend className="text-xl uppercase font-racing">
          Entrer son kilométrage
        </legend>
        <div className="grid">
          <div className="flex col-span-2 sm:pb-4 sm:col-span-1 md:col-span-1 lg:col-span-2 items-center py-4">
            <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg flex-row">
              <svg
                id="Layer_1"
                className="h-6 w-6 opacity-30"
                enableBackground="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m304.2 425.767h-96.4c-8.284 0-15 6.716-15 15s6.716 15 15 15h96.4c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
                  <path d="m298.188 333.205c3.15-6.32 4.931-13.442 4.931-20.983 0-26.023-21.096-47.119-47.119-47.119-7.543 0-14.666 1.782-20.987 4.933l-70.654-70.657c-5.857-5.858-15.355-5.858-21.213 0-5.858 5.857-5.858 15.354 0 21.213l70.659 70.662c-3.145 6.316-4.923 13.433-4.923 20.968 0 26.023 21.096 47.119 47.119 47.119 7.537 0 14.655-1.779 20.972-4.925l16.621 16.623c5.858 5.858 15.354 5.86 21.213.002 5.858-5.857 5.859-15.354.001-21.213zm-42.188-3.864c-9.439 0-17.119-7.679-17.119-17.118s7.679-17.119 17.119-17.119 17.119 7.68 17.119 17.119-7.68 17.118-17.119 17.118z" />
                  <path d="m256 56.233c-141.159 0-256 114.841-256 256 0 44.99 11.862 89.257 34.305 128.017 4.146 7.16 13.308 9.609 20.474 5.476.003-.002 41.751-24.102 41.751-24.102 7.174-4.142 9.632-13.315 5.49-20.49-4.142-7.174-13.314-9.635-20.49-5.49l-28.332 16.357c-13.014-26.421-20.719-55.265-22.68-84.767h32.682c8.284 0 15-6.716 15-15s-6.716-15-15-15h-32.69c1.992-30.246 9.957-58.883 22.731-84.743l28.29 16.333c7.176 4.145 16.35 1.684 20.49-5.49 4.142-7.175 1.684-16.349-5.49-20.49l-28.255-16.314c16.445-24.478 37.544-45.577 62.022-62.022l16.312 28.252c4.142 7.175 13.316 9.635 20.49 5.49 7.174-4.143 9.632-13.316 5.49-20.49l-16.332-28.287c25.86-12.773 54.498-20.733 84.742-22.728v32.689c0 8.284 6.716 15 15 15s15-6.716 15-15v-32.689c30.244 1.995 58.882 9.956 84.742 22.728l-16.332 28.287c-4.142 7.174-1.684 16.348 5.49 20.49 7.174 4.145 16.348 1.685 20.49-5.49l16.312-28.252c24.478 16.444 45.578 37.543 62.022 62.022l-28.254 16.312c-7.174 4.142-9.632 13.315-5.49 20.49 4.141 7.174 13.314 9.635 20.49 5.49l28.29-16.333c12.773 25.86 20.739 54.497 22.731 84.743h-32.691c-8.284 0-15 6.716-15 15s6.716 15 15 15h32.682c-1.961 29.502-9.666 58.346-22.68 84.767l-28.332-16.357c-7.176-4.145-16.348-1.684-20.49 5.49-4.142 7.175-1.684 16.349 5.49 20.49 0 0 41.748 24.1 41.751 24.102 7.167 4.133 16.328 1.685 20.474-5.476 22.443-38.758 34.305-83.024 34.305-128.015 0-141.159-114.841-256-256-256z" />
                </g>
              </svg>

              <input
                className="bg-gray-100 outline-none"
                value={value}
                onChange={this.handleChange}
                type="text"
                placeholder="Kilométrages de ma voiture..."
              />
            </div>
          </div>
          <div className="flex col-span-2 sm:pb-4 sm:col-span-1 md:col-span-1 lg:col-span-2 items-center bg-yellow-300 py-4 px-2 uppercase font-light text-lg">
            Votre véhicule à {value.toLocaleString()} Km
          </div>
        </div>
      </fieldset>
    );
    return (
      <div className="container">
        <h1 className="text-4xl font-extrabold text-center p-6 uppercase font-racing">
          AutoLog
        </h1>
        <p className="p-4 text-gray-500 text-center">
          Cette application n'a pas vocation à être fiable, elle permet
          uniquement d'informer l'utilisateur via un code couleur sur l'usure
          éventuelle des pièces de son véhicule basé sur son compteur
          kilométrique.
        </p>
        {customForm}
        <section className="p-8 grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.map((part, index) => {
            console.log(part);
            return autoPart({ ...part });
          })}
        </section>
      </div>
    );
  }
}

ReactDom.render(<AutoLogApp />, document.getElementById("root"));
