import React       from "react";

import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Home      from "./components/home-component";
import Country   from "./components/country-page-component";
import ErrorPage from "./components/error-component";

import "./sass/styles.sass";

const mapStateToProps = ({ darkMode }) => (
  { darkMode: darkMode}
)


const Presentational = (props) => {
  return (
    <div id="infinite_scroll" className={`app ${props.darkMode ? "dark" : "light"}`}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/region/:region" component={Home} />
        <Route path="/country/:countryId" component={Country} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

const App = connect (mapStateToProps, null) (Presentational);


export default App