import React, { Component } from 'react';
import "../sass/styles.sass"



class CountryCard extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    const props = this.props;
    return (
      <div className="country__card">
        <div className="country__card-flag-wrapper">
          <div className="country__card-flag" style={{backgroundImage: `url(${props.flag})`}}>
  
          </div>
          {/* <img className="country__card-flag" src={props.flag} /> */}
        </div>
  
        <div className="country__card-info-wrapper">
          <div className="country__card-name-wrapper">
            <h1 className="country__card-name">{props.name}</h1>
  
          </div>
  
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


  componentDidMount () {
    
    function isOverflown(element) {
       return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
     }

    const text = document.querySelectorAll (".country__card-name")

    Array.from (text).forEach (el =>
      el.addEventListener ("mouseover", (event) => {
        if (isOverflown (event.target))
          event.target.classList.add ("name-overflow")
      })
    )
    

    const events = ["mouseout", "touchstart"]
    
    events.forEach (evt => {
      Array.from (text).forEach (el =>
        el.addEventListener (evt, (event) => {
          if (isOverflown (event.target))
            event.target.classList.remove ("name-overflow")
        })
      )

    })

   }
}


export default CountryCard