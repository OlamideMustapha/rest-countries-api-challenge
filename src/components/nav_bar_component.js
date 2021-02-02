import React, { Component } from 'react';
import "./sass/styles.sass"


class Nav extends Component {
  constructor (props) {
    super (props);

    this.state = {
      darkMode: false
    }
  }


  render () {

    return (
      <nav className="nav">
        <div>
          <h1 className="nav__text">Where in the world?</h1>
        </div>

        <div>
          <button className="nav__btn">
           {/* Include Icons */ }
            Dark Mode
          </button>
        </div>
      </nav>
    );
  }
}


export default Nav;