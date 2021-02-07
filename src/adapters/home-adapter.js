import {
    requestingData
  , receivedData
  , storeData
  , storeData_country} from "../redux-store.js"


// Async handlers
export const handleSearchRequest = value => {

  const api      = " https://restcountries.eu/rest/v2/",
        endpoint = `name/${value}`,
        params   = `?fields=name;population;capital;region;flag`;


  return (dispatch) => {
    dispatch (requestingData ());

    fetch (api + endpoint + params)
      .then (res => res.json ())
      .then (data => {
        dispatch (receivedData ());
        dispatch (storeData (data));
      })
      .catch (e => console.log (e));
  }
}


export const handleFilterRequest = (value) => {
  const api      = " https://restcountries.eu/rest/v2/",
        endpoint = `region/${value}`,
        params   = `?fields=name;population;capital;region;flag`;

  return (dispatch) => {
    dispatch (requestingData ());

    fetch (api + endpoint + params)
      .then (res => res.json ())
      .then (data => {
        dispatch (receivedData ());

        dispatch (storeData (data));
      })
      .catch (e => console.log (e));
  }
}


export const fetchCountryData = (countryName) => {
  const api      = " https://restcountries.eu/rest/v2/",
        endpoint = `name/${countryName}`,
        params   = "?fields=name;population;capital;region;flag;nativeName;subregion;topLevelDomain;currencies;languages;borders";

  return (dispatch) => {
    dispatch (requestingData ());
    
    fetch (api + endpoint + params)
    .then (res => res.json ())
    .then (data => {
        dispatch (receivedData ());
        dispatch (storeData_country ({...data}));
      })
      .catch (e => console.log (e));
  }
}

export default handleSearchRequest;