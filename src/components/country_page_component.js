import React, { Component } from 'react';
import "./sass/styles.sass"


// back arrow <ion-icon name="arrow-back-sharp"></ion-icon>

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


const Country = (props) => {
  return (
    <div className="country">
      <div>
        <button className="country__btn btn">
          {/* Include icon */}
        </button>
      </div>

      <div>
        <section>
          <img className="country__flag" src={props.flag}/>
        </section>

        <section>
          <h1 className="country__name">{props.name}</h1>
          <div className="country__info">
            <ul className="country__info-first">
              {/* Render Info */}  
            </ul>

            <ul className="country__info-second">
              {/* Render Info */}  
            </ul>
          </div>

        </section>

        <section>
          <h1 className="border__countries-title">
            Border Countries:
          </h1>

          {/* Render Border Countries */}
        </section>
      </div>

    </div>
  );
}


export default Country;