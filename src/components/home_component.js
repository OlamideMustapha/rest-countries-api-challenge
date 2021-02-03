import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
import CountryCard from "./country_card_component.js";
import "./sass/styles.sass"


// search <ion-icon name="search"></ion-icon>


// filter request
// https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}

// home: https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;flag

// country: https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;flag;nativeName;subregion;topLevelDomain;currencies;languages;borders


// all https://restcountries.eu/rest/v2/all
// search by name: https://restcountries.eu/rest/v2/name/{name}
// search by fullName: https://restcountries.eu/rest/v2/name/{name}?fullText=true
// search by region: https://restcountries.eu/rest/v2/region/{region}

const defaultState = {
  fetching: false,
  countries: []
};


const REQUESTING_DATA = "REQUESTING_DATA";
const RECEIVED_DATA   = "RECEIVED_DATA";


const requestingData = () => ({ type: REQUESTING_DATA });
const receivedData   = () => ({ type: RECEIVED_DATA, users: data.users });


const handleSearchRequest = (type, value) => {

  const api = " https://restcountries.eu/rest/v2/";
  const endpoint = type === "search" ? `name/${value}` : `region/${value}`;

  return (dispatch) => {
    dispatch (requestingData ());

    fetch (api + endpoint)
      .then (res => res.json ())
      .then (data => {
        dispatch (receivedData (data));
      })
      .catch (e => console.log (e));
  }
}

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUESTING_DATA:
      return { fetching: true, countries: [] };
    case RECEIVED_DATA:
      return { fetching: false, countries: action.users };
    default:
      return state;
  }
}

mapDispatchToProps = (dispatch) => ({searchCountry: (name) => dispatch (handleSearchRequest (name))});
mapStateToProps = (state) => ({ countries: state });


class Presentational extends Component {
  constructor (props) {
    super (props);

    this.state = {
      input: ""
    };

    this.handleInputChange = this.handleInputChange.bind (this);
    this.searchByName      = this.search.bind (this);
    this.filterByRegion    = this.filterByRegion.bind (this);
  }

  handleInputChange (event) {
    this.setState ({ input: event.target.value });
  }

  searchByName () {
    // search for country entered
    this.props.searchCountry ("search", this.state.input);

    this.setState ({ input: "" });
  }

  filterByRegion (event) {
    this.props.searchCountry ("filter", this.event.target.value);
  }



  render () {
    return (
      <div className="home">

        <div className="search-filter">
          <div clasName="search__input-wrapper">
            <button className="search__btn btn" onClick={this.searchByName}>
              <ion-icon name="search"></ion-icon>
            </button>
            <input value={this.state.input} onChange={this.handleInputChange} />
          </div>

          <div className="filter__select-wrapper">
            <select className="filter__drop_down" name="filter">
              <option value="Africa">Africa</option>
              <option value="Europe">Europe</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>


        {/* render list of countries */}
        <div>
          {
            this.props.view.map (c => 
              <CountryCard 
                flag={c.flag} 
                name={c.name}
                populaton={c.populaton}
                region={c.region}
                capital={c.capital}/>)
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    const dropDown = document.querySelector ("filter__drop_down");

    dropDown.childNodes.forEach (child => {
      child.addEventListener ("click", this.filterByRegion)
    })
  }
}


const HomeContainer = connect (mapStateToProps, mapDispatchToProps) (Presentational);

export default HomeContainer;