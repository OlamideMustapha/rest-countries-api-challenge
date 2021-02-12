import React, { useState, useEffect, useRef } from 'react';
import { connect }                    from "react-redux";
import Nav                            from "./nav-bar-component.js";
import {
  Link,
  useParams,
  useHistory
} from "react-router-dom";
import { fetchCountryData } from '../adapters/home-adapter';

import "../sass/styles.sass"


const mapStateToProps = ({ country, fetching }) => (
  { data: { ...country },
    loading: fetching }
);


const mapDispatchToProps = { fetchCountryData };


const Info = (props) => {
  return (
    <li>
      <div className="country__info-title">
        {props.title}:
      </div>
      <div className="country__info-value">
        {props.value}
      </div>
    </li>
  );
};


const BorderCountry = props => {
  const [name, setName] = useState (props.name);

  useEffect ( () => {
    fetch (`https://restcountries.eu/rest/v2/alpha/${props.name}?fields=name`)
      .then (res => res.json ())
      .then (({ name }) => setName (name))
      .catch (console.log);
  }, [])
  return (
    <Link to={`/country/${name}`} className="country__borders btn">
      <button className="btn">
        {name}
      </button>
    </Link>
  );
};


const Presentational = (props) => {
  const { countryId } = useParams ();
  let { flag
      , name
      , population
      , nativeName
      , region
      , subregion
      , capital
      , currencies
      , languages
      , borders
      , topLevelDomain} = props.data;
  const mounted = useRef (false);

  useEffect (() => {
    mounted.current = true;
    return () => { mounted.current = false; }
  })

  useEffect (() => {
    if (mounted.current == true) {
      props.fetchCountryData (countryId);
    }

    return () => {}
  }, [countryId]);
  
  let history = useHistory ();

  const body = 
    <main className="country p-sm p-l" >
      <div>
        <button className="country__btn btn" onClick={history.goBack}>
          <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
            <title>Arrow Back</title>
            <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M244 400L100 256l144-144M120 256h292'/>
            </svg>
          Back
        </button>
      </div>

      <div className="country__info-wrapper">
        
        <section className="country__flag-wrapper">
          <div className="country__flag" style={{backgroundImage: `url(${flag})`}}>

          </div>
        </section>

        <section className="country__info-details">
          <h1 className="country__name">{name}</h1>
          <div className="country__info">
            <ul className="country__info-first">
              {/* Render Info */}  
              
              <Info title={"Native Name"} value={nativeName}/>
              {
                population ?
                <Info title={"Population"} value={population.toLocaleString()}/>
                : null
              }
              <Info title={"Region"} value={region}/>
              <Info title={"Sub Region"} value={subregion}/>
              <Info title={"Capital"} value={capital}/>
            </ul>

            <ul className="country__info-second">
              {/* Render Info */}  
              <Info title={"Top Level Domain"} value={topLevelDomain}/>
              {
                currencies ? <Info title={"Currencies"}     value={currencies.map ((l) => l.name).join (", ")}/>
                : null
              }
              {
                languages
                ? <Info title={"Languages"}
                        value={languages.map ((l) => l.name).join (", ")}/>
                : null
              }
            </ul>
          </div>

          <section className="border__countries-wrapper">
            <h1 className="border__countries-title">
              Border Countries:
            </h1>
            
            {/* Render Border Countries */}
            <div className="country__borders-wrapper">
              {
                borders
                ? borders.map ((b, index) =>
                    <BorderCountry name={b} key={index} />)
                : null
              }
            </div>
          </section>
        </section>

      </div>
    </main>


  return (
    <div>
      <Nav />

      { props.loading
         ? <h5 className="loader">Loading ...</h5>
         : body
      }
      
    </div>
  );
}

const Country = connect (mapStateToProps, mapDispatchToProps) (Presentational);


export default Country;