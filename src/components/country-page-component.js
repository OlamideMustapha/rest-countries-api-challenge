import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import {
  Link,
  useLocation,
  useParams,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import { fetchCountryData } from '../adapters/home-adapter';

import "../sass/styles.sass"
// back arrow <ion-icon name="arrow-back-sharp"></ion-icon>

const mapStateToProps = (store) => (
  { ...store.home.country }
)


const mapDispatchToProps = (dispatch) => (
  {fetchCountryData : name  => dispatch (fetchCountryData (name))
  }
);


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


const BorderCountry = (props) => {
  return (
    <button className="country__borders btn">
      {props.name}
    </button>
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
      , topLevelDomain} = props;

  
  useEffect (() => {
    props.fetchCountryData (countryId);
  }, []);
  
  let history = useHistory ();
  return (
    <div className="country p-sm p-l">
      <div>
        <Link>
          <button className="country__btn btn" onClick={history.goBack}>
            {/* Include icon */}
            <svg xmlns='http://www.w3.org/2000/svg' className='ionicon' viewBox='0 0 512 512'>
              <title>Arrow Back</title>
              <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='48' d='M244 400L100 256l144-144M120 256h292'/>
              </svg>
            Back
          </button>
        </Link>
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
                    <Link>
                      <BorderCountry name={b} key={index} />
                    </Link>)
                : null
              }
            </div>
          </section>
        </section>

      </div>

    </div>
  );
}

const Country = connect (mapStateToProps, mapDispatchToProps) (Presentational);


export default Country;