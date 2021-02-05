import React, { Component } from 'react';
import "../sass/styles.sass"


const CountryCard = (props) => {

  return (
    <div className="country__card">
      <div className="country__card-flag-wrapper">
        <div className="country__card-flag" style={{backgroundImage: `url(${props.flag})`}}>

        </div>
        {/* <img className="country__card-flag" src={props.flag} /> */}
      </div>

      <div className="country__card-info-wrapper">
        <h1 className="country__card-name">{props.name}</h1>

        <div>
          <div className="country__card-info population">
            <div className="country__card-info-title">
              Population:
            </div>
            {props.population.toLocaleString()}
          </div>
          <div className="country__card-info region">
            <div className="country__card-info-title">
              Region:
            </div>
            {props.region}
          </div>
          <div className="country__card-info capital">
            <div className="country__card-info-title">
              Captial:
            </div>
            {props.capital}
          </div>
        </div>
      
      </div>

    </div>
  );
}


export default CountryCard