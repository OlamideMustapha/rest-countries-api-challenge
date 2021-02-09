import React, { Component } from 'react';
import { connect }          from "react-redux";
import { Link }             from "react-router-dom";
import InfiniteScroll       from "react-infinite-scroll-component";
import Nav                  from "./nav-bar-component.js";
import CountryCard          from "./country-card-component.js";
import DropDown             from './drop-down-component.js';
import { 
    fetchAll
  , handleSearchRequest
  , handleFilterRequest } from "../adapters/home-adapter";
import "../sass/styles.sass";


// Maping action creators to props
const mapDispatchToProps =
  { searchCountryData: handleSearchRequest
  , filterCountryData: handleFilterRequest
  , fetchAll:          fetchAll
  }


// Mapping redux state to props
const mapStateToProps = ({ countries }) => (
  { countries: countries }
);



class Presentational extends Component {
  constructor (props) {
    super (props);

    this.state = {
      // holds input value
      input: "",

      /**
       *  determines what index to slice country data to
       *  be rendered from  
       */
      prev: 0,  
      next: 20,
      hasMore: true,

      current: []
    };

    this.handleInputChange = this.handleInputChange.bind (this);
    this.filterByRegion    = this.filterByRegion.bind (this);
    this.updateCurrent     = this.updateCurrent.bind (this);
    this.searchByName      = this.searchByName.bind (this);
    this.loadMoreData      = this.loadMoreData.bind (this);
  }

  /* handles input controlled component */
  handleInputChange (event) {
    this.setState ({ input: event.target.value });
  }

  /* search country */
  searchByName () {
    // search for country name entered
    this.props.searchCountryData (this.state.input)
      .then ( this.updateCurrent );
  }

  /* filtering countries by region */
  filterByRegion (value) {
    this.props.filterCountryData (value)
      .then ( this.updateCurrent );
  }

  /* Updates countries data being rendered */
  loadMoreData () {
    let { prev, next, current } = this.state;
    const { countries } = this.props;

    if (current.length === countries.length) {
      this.setState ({ hasMore: false });
      return;
    }

    const newPrev = prev + 10;
    const newNext = next + 10;

    setTimeout(() => {
      const updated = current.concat (countries.slice (newPrev, newNext));
      this.setState ({current: updated });
    }, 2000);


    this.setState({ prev: newPrev, next: newNext });

  }

  updateCurrent () {
    const { prev, next } = this.state;
    const { countries } = this.props;
    this.setState ({ current: countries.slice (prev, next) });
  }


  render () {
    const { current, hasMore, input } = this.state;

    return (
      <div>

        {/* Navigation */}
        <Nav />

        {/* Main page */}
        <main className={`home p-sm p-l`}>

          <div className="search-filter">
            <div className="search__input-wrapper">
              <button className="search__btn btn"
                      onClick={this.searchByName}>

                <svg xmlns='http://www.w3.org/2000/svg'
                     className='ionicon' viewBox='0 0 512 512'>
                  <title>Search</title>
                  <path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z'
                        fill='none' stroke='currentColor' strokeMiterlimit='10'
                        strokeWidth='32'/>
                  <path fill='none' stroke='currentColor'
                        strokeLinecap='round' strokeMiterlimit='10'
                        strokeWidth='32' d='M338.29 338.29L448 448'/>
                </svg>

              </button>

              <input value={input}
                     onChange={this.handleInputChange}
                     placeholder="Search for a country..."/>
            </div>

            <div className="filter__drop-down-wrapper">
              <DropDown filterByRegion={this.filterByRegion}/>
            </div>
          </div>


          {/* render list of countries */}
          <InfiniteScroll dataLength={current.length}
                          next={this.loadMoreData}
                          hasMore={hasMore}
                          loader={<p className="loader">Loading ....</p>}
                          scrollableTarget="infinite_scroll"
                          style={{ overflow: 'none'}}
          >
            <div className="country__card-wrapper">
              {this.state.current.map ((c, idx) =>
                <Link key={idx} to={`/country/${c.name}`}>
                  <CountryCard flag={c.flag}
                                name={c.name} population={c.population}
                                region={c.region} capital={c.capital} />
                </Link>
                )
              }
            </div>
          </InfiniteScroll>

        </main>
        {/* End of main page */}

      </div>
    )
  }
  componentDidMount () {

   this.props.fetchAll ()
    .then ( this.updateCurrent );
  }
}


const Home = connect (mapStateToProps, mapDispatchToProps) (Presentational);

export default Home;