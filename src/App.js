import React, { Component } from "react";
import { Provider }         from "react-redux";
import store                from "./redux-store";
import "./sass/styles.sass";

import HomeContainer from "./components/home-component";
import NavContainer  from "./components/nav-bar-component";

// my sql workbench
// components
// nav bar
// search input
// filter dropdown
// country card

const App = (props) => {
  return (
    <Provider store={store}>
      <div className="app light">
        <NavContainer />
        <HomeContainer />
      </div>
    </Provider>
  );
}


export default App


// start app
// request fetch data from api
// user search by name (filter all data currently being displayed for search query)
// user filter (filter all data by region)