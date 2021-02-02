import React, { Component } from 'react';
import "./sass/styles.sass"


const CountryCard = (props) => {

  return (
    <div className="country__card">
      <div>
        <img className="country__card-flag" src={props.img} />
      </div>

      <div>
      
        <h1 className="country__card-name">{props.name}</h1>

        <div className="country__card-info">
          <div className="country__card-info-population">
            {props.population}
          </div>
          <div className="country__card-info-region">
            {props.region}
          </div>
          <div className="country__card-info-capital">
            {props.capital}
          </div>
        </div>
      
      </div>

    </div>
  );
}


export default CountryCard