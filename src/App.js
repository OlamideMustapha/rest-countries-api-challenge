import React, { Component } from "react";

import { connect } from "react-redux";
import {Route, Switch } from 'react-router-dom';


import "./sass/styles.sass";


import Home from "./components/home-component";
import Nav  from "./components/nav-bar-component";
import Country       from "./components/country-page-component";
import ErrorPage     from "./components/error-component";

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
      <Nav />

      <Switch>
        <Route path="/" component={Home} exact />

        <Route path="/country/:countryId" component={Country} />

        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

const App = connect (mapStateToProps, null) (Presentational);


export default App


// start app
// request fetch data from api
// user search by name (filter all data currently being displayed for search query)
// user filter (filter all data by region)