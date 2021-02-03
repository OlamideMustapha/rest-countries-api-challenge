import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import "./sass/styles.sass"


// moon icon <ion-icon name="moon"></ion-icon>
// <ion-icon name="moon-outline"></ion-icon>

const defaultState = { darkMode: false };

// action 
const MODE = "MODE";
// action creators
const toggleMode = () => ( {type: MODE} );
// reducer
const navReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MODE:
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
}

mapDispatchToProps = (dispatch) => ({toggleMode: () => dispatch (toggleMode ())});
mapStateToProps = (state) => ({ darkMode: state });


const Presentational = props => {
  return (
    <nav className="nav">
      <div>
        <h1 className="nav__text">Where in the world?</h1>
      </div>

      <div>
        <button className="nav__btn" onClick={props.toggleMode}>
          {/* Include Icons */ }
          Dark Mode
        </button>
      </div>
    </nav>
  );
}


const NavContainer = connect (mapStateToProps, mapDispatchToProps) (Presentational);

export default NavContainer;