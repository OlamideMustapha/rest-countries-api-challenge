import React          from 'react';
import { connect }    from "react-redux";
import { toggleMode } from "../redux-store.js";
import { Link }       from "react-router-dom";

import "../sass/styles.sass";


const mapDispatchToProps = (dispatch) => ({toggleMode: () => dispatch (toggleMode ())});

const mapStateToProps    = ({ darkMode }) => (
  { darkMode: darkMode }
);


const Presentational = props => {
  return (
    <nav className={`nav p-sm p-l`}>
      <div>
        <Link to="/">
          <h1 className="nav__text">Where in the world?</h1>
        </Link>
      </div>

      <div>
        <button className="nav__btn btn" onClick={props.toggleMode}>
          {/* Include Icons */ }
          <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'><title>Moon</title><path d='M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z'  fillRule="evenodd"/></svg>

          Dark Mode
        </button>
      </div>
    </nav>
  );
}


const Nav = connect (mapStateToProps, mapDispatchToProps) (Presentational);

export default Nav;