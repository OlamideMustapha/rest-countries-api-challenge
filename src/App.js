import React, { Component } from "react";
import { connect } from "react-redux";
import "./sass/styles.sass";

import HomeContainer from "./components/home-component";
import NavContainer  from "./components/nav-bar-component";

// my sql workbench
// components
// nav bar
// search input
// filter dropdown
// country card


const mapStateToProps = ({nav}) => (
  { darkMode: nav.darkMode}
)


const Presentational = (props) => {
  return (
    <div className={`app ${props.darkMode ? "dark" : "light"}`}>
      <NavContainer />
      <HomeContainer />
    </div>
  );
}

const App = connect (mapStateToProps, null) (Presentational);


export default App


// start app
// request fetch data from api
// user search by name (filter all data currently being displayed for search query)
// user filter (filter all data by region)