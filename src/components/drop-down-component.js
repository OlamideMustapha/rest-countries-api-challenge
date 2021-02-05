import React, { Component } from "react";
import "../sass/styles.sass";
import arrowDown from "../assets/icon-arrow-down-light.svg"

class DropDown extends Component {
  constructor (props) {
    super (props);

    this.state = {
      selected: "All",
      options: ["Africa", "Americas", "Europe", "Asia", "Oceania"],
    }

    this.handleClick = this.handleClick.bind (this);
  }

  handleClick (event) {
    const value = event.target.value;
    this.setState ({selected: value});
    this.props.filterByRegion (value);
  }

  render () {
    const { selected, options } = this.state;

    return (
      <div className="drop-down" value={selected}>
        <div className="drop-down__view">
          <div className="drop-down__text">Filter by Region</div>
          <div className="drop-down__btn" >
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 .799l4 4 4-4" stroke="#000000" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
          </div>
        </div>
        <div className="drop-down__options hide">
          {
            options.map ((option, idx) => {
              return <button value={option} key={idx} onClick={this.handleClick}>{option}</button>
            })
          }
        </div>

      </div>
    )
  }

  componentDidMount () {

    const btn     = document.querySelector (".drop-down__btn"),
          options = document.querySelector (".drop-down__options");

    btn.addEventListener ("click", () => {
      if (options.classList.contains ("display")) {
        options.classList.remove ("display");
        options.classList.add ("hide");

      } else {
        options.classList.remove ("hide");
        options.classList.add ("display");
      }
    });

  }
}

export default DropDown;
