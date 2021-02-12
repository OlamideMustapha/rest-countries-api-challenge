/** 
 * * home page 
 */

 
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


// * mapping redux action creators to props
const mapDispatchToProps =
  { searchCountryData: handleSearchRequest
  , filterCountryData: handleFilterRequest
  , fetchAll:          fetchAll
  }


// * mapping redux state to props
const mapStateToProps = ({ countries, fetching }) => (
  { countries: countries
  , loading : fetching
  }
);


/**
 * Home Page component
 * * This component uses infinite scroll, this allows for
 * * better performance when rendering lists country data
 */
class Presentational extends Component {
  constructor (props) {
    super (props);

    //* initializing state
    this.state = {
      input: "",  //? holds input value for contolled component
      prev: 0,    //? index to start slicing data
      next: 16,   //* index to stop slicing data
                  //? 4x4
      hasMore: true,
      current: [] //? holds the current list of data to render
    };

    //* binding methods to component
    this.handleInputChange = this.handleInputChange.bind (this);
    this.filterByRegion    = this.filterByRegion.bind (this);
    this.updateCurrent     = this.updateCurrent.bind (this);
    this.searchByName      = this.searchByName.bind (this);
    this.loadMoreData      = this.loadMoreData.bind (this);
    this.handleKeyPress    = this.handleKeyPress.bind (this);
  }


  /**
   * handleInputChange
   * * updates the input value for controlled input
   * @param {*} event 
   */
  handleInputChange (event) {
    this.setState ({ input: event.target.value });
  }


  /**
   * handleKeyPress
   * ? Trigger's search on Enter key press
   */

  handleKeyPress (event) {
    if (event.key == "Enter") {
      this.searchByName ()
    }
  }
  
  /**
   * searchByName
   * * updates component to render user's search input
   */
  searchByName () {
    this.props.searchCountryData (this.state.input)
      .then ( this.updateCurrent );
  }


  /**
   * filterByRegion 
   * * updates component to render data filtered by region
   */
  filterByRegion (value) {
    this.props.filterCountryData (value)
      .then ( this.updateCurrent );
  }


  /**
   * loadMoreData
   * * appends more data to be rendered to current
   * ? called by the infinite scroll component
   */
  loadMoreData () {
    const { prev, next, current } = this.state;
    const { countries } = this.props;

    //? check if all data has being loaded
    if (current.length === countries.length) {
      this.setState ({ hasMore: false });
      return; //! exit
    }

    const newPrev = prev + 16;
    const newNext = next + 16;

    //* 2s delay while loading data
    setTimeout(() => {
      const updated = current.concat (countries.slice (newPrev, newNext));
      this.setState ({ current: updated });
    }, 2000);


    this.setState({ prev: newPrev, next: newNext });
  }

  /**
   * updateCurrent
   * * helper method to set current data to display
   */
  updateCurrent () {
    const { prev, next } = this.state,
          { countries }  = this.props,
          chunk          = countries.slice (prev, next),
          hasMore        = chunk.length < countries.length;
    this.setState ({ current: chunk, hasMore });
  }


  render () {
    const { current, hasMore, input } = this.state;
    const { loading } = this.props;
    
    const body =  <main className={`home p-sm p-l`}>
      <div className="search-filter">
        <div className="search__input-wrapper" onKeyPress={this.handleKeyPress}>
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
                      className="infinite_scroll"
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

    
    return (
      <div>
        {/* Navigation */}
        <Nav />

        {/* Main page */}
        {loading
          ? <h5 className="loader">Loading ...</h5>
          : body
         }
        {/* End of main page */}

      </div>
    )
  }

  componentDidUpdate (prevProps) {
    const { match, fetchAll } = this.props;

    /**
     * * update component to render the desired list of
     * * data when route changes
     * ? prevProps is the previous props before update
     * ? props.match holds routing data for this component
     */
    if ( prevProps.match.url !== match.url) {
      if ( match.path === "/") {
        //? fetch data for all country
        fetchAll ()
          .then ( this.updateCurrent );
      } else {
        //? fetch data for region specified
        const { region } = match.params //? access route parameter
        this.filterByRegion (region);      
      }
    }

  }
  
  componentDidMount () {
    const { match, fetchAll } = this.props;
    /**
     * * Enable the component to load the desire list
     * * depending on the url
     * ? this code block let the app render the appropiate list
     * ? if the is enter directly
     */
    if (match.path === "/") {
      //? fetch data for all country
      fetchAll ()
      .then ( this.updateCurrent );
    } else {
      //? fetch data for region specified
      const { region } = match.params
      this.filterByRegion (region);
    }

  }
}


//* connecting component to redux store
//! do not remove line
const Home = connect (mapStateToProps, mapDispatchToProps) (Presentational);

export default Home;