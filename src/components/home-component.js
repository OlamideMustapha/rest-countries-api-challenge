import React, { Component } from 'react';
import { connect } from "react-redux";
import CountryCard from "./country-card-component.js";
import "../sass/styles.sass";
import "./drop-down-component.js";
import DropDown from './drop-down-component.js';

// search <ion-icon name="search"></ion-icon>


// filter request
// https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}

// home: https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;flag

// country: https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;flag;nativeName;subregion;topLevelDomain;currencies;languages;borders


// all https://restcountries.eu/rest/v2/all
// search by name: https://restcountries.eu/rest/v2/name/{name}
// search by fullName: https://restcountries.eu/rest/v2/name/{name}?fullText=true
// search by region: https://restcountries.eu/rest/v2/region/{region}

const al = {
  capital: "Algiers",
  flag: "https://restcountries.eu/data/dza.svg",
  name: "Algeria",
  population: 40400000,
  region: "Africa"
}


const defaultState = {
  fetching: false,
  search: { query: "*" },
  filter: { by: "all" },
  countries: [al, al , al , al , al , al , al , al , al, al , al, al]
};


const REQUESTING_DATA = "REQUESTING_DATA";
const RECEIVED_DATA   = "RECEIVED_DATA";


const requestingData = () => ({ type: REQUESTING_DATA });
const receivedData   = (data) => ({ type: RECEIVED_DATA, data: data });


const handleSearchRequest = (type, value) => {

  const api      = " https://restcountries.eu/rest/v2/";
  const endpoint = type === "search" ? `name/${value}` : `region/${value}`;
  const fields   = `?fields=name;population;capital;region;flag`;


  return (dispatch) => {
    dispatch (requestingData ());

    fetch (api + endpoint + fields)
      .then (res => res.json ())
      .then (data => {
        dispatch (receivedData (data));
      })
      .catch (e => console.log (e));
  }
}


export const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUESTING_DATA:
      return { fetching: true, countries: [] };
    case RECEIVED_DATA:
      return { fetching: false, countries: action.data };
    default:
      return state;
  }
}

const mapDispatchToProps = (dispatch) =>
  ({searchCountry: (type, value) => dispatch (handleSearchRequest (type, value))});
const mapStateToProps = ({ home, nav }) => (
  { countries: home.countries
  , darkMode : nav.darkMode
  }
);



class Presentational extends Component {
  constructor (props) {
    super (props);

    this.state = {
      input: ""
    };

    this.handleInputChange = this.handleInputChange.bind (this);
    this.searchByName      = this.searchByName.bind (this);
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

  filterByRegion (value) {
    this.props.searchCountry ("filter", value);
  }



  render () {
    return (
      <div className={`home p-sm p-l`}>

        <div className="search-filter">
          <div className="search__input-wrapper">
            <button className="search__btn btn" onClick={this.searchByName}>
              <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
                <title>Search</title>
                <path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' fill='none' stroke='currentColor' strokeMiterlimit='10' strokeWidth='32'/>
                <path fill='none' stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='32' d='M338.29 338.29L448 448'/>
              </svg>
            </button>
            <input value={this.state.input} onChange={this.handleInputChange} placeholder="Search for a country..."/>
          </div>

          <div className="filter__drop-down-wrapper">
            <DropDown filterByRegion={this.filterByRegion}/>
          </div>
        </div>


        {/* render list of countries */}
        <div className="country__card-wrapper">
          {
              this.props.countries.map ((c, idx) => 
                <CountryCard 
                  key={idx}
                  flag={c.flag} 
                  name={c.name}
                  population={c.population}
                  region={c.region}
                  capital={c.capital}/>)
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
  //  this.filterByRegion ("Africa")
  }
}


const HomeContainer = connect (mapStateToProps, mapDispatchToProps) (Presentational);

export default HomeContainer;