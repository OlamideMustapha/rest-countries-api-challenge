import React, { Component } from 'react';
import { connect }          from "react-redux";
import { Link }             from "react-router-dom";
import CountryCard          from "./country-card-component.js";
import DropDown             from './drop-down-component.js';
import { 
    handleSearchRequest
  , handleFilterRequest } from "../adapters/home-adapter";
import "../sass/styles.sass";

// search <ion-icon name="search"></ion-icon>

const mapDispatchToProps = (dispatch) => (
  { searchCountryData: value => dispatch (handleSearchRequest (value))
  , filterCountryData: value => dispatch (handleFilterRequest (value))
  }
);

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
    // search for country name entered
    this.props.searchCountryData (this.state.input);

    this.setState ({ input: "" });
  }

  filterByRegion (value) {
    // filter country by region
    this.props.filterCountryData (value);
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
              <Link key={idx} to={`country/${c.name}`}>

                <CountryCard flag={c.flag} name={c.name} population={c.population} region={c.region} capital={c.capital} />

              </Link>
            )
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
   this.filterByRegion ("Africa");
  }
}


const Home = connect (mapStateToProps, mapDispatchToProps) (Presentational);

export default Home;