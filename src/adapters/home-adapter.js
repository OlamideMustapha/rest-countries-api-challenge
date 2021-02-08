import {
    requestingData
  , receivedData
  , storeData
  , storeData_country} from "../redux-store.js"

export const fetchAll = () => {
  const api      = " https://restcountries.eu/rest/v2/",
        endpoint = "all",
        params   = "?fields=name;population;capital;region;flag";
        
  return async (dispatch) => {
    dispatch (requestingData ());
    try {
      const res = await fetch (api + endpoint + params),
            data = await res.json ();
      dispatch (receivedData ());
      dispatch (storeData (data));
    } catch (e) {
      console.log (e);
    }
  }     
}
// Async handlers
export const handleSearchRequest = value => {

  const api      = " https://restcountries.eu/rest/v2/",
        endpoint = `name/${value}`,
        params   = `?fields=name;population;capital;region;flag`;


  return async (dispatch) => {
    dispatch (requestingData ());
    try {
      const res = await fetch (api + endpoint + params),
            data = await res.json ();
      dispatch (receivedData ());
      dispatch (storeData (data));
    } catch (e) {
      console.log (e);
    }
  }
}


export const handleFilterRequest = (value) => {
  const api      = " https://restcountries.eu/rest/v2/",
        endpoint = `region/${value}`,
        params   = `?fields=name;population;capital;region;flag`;

  return async (dispatch) => {
    dispatch (requestingData ());
    try {
      const res = await fetch (api + endpoint + params),
            data = await res.json ();
      dispatch (receivedData ());
      dispatch (storeData (data));
    } catch (e) {
      console.log (e);
    }
  }
}


export const fetchCountryData = (countryName) => {
  const api      = " https://restcountries.eu/rest/v2/",
        endpoint = `name/${countryName}`,
        params   = "?fields=name;population;capital;region;flag;nativeName;subregion;topLevelDomain;currencies;languages;borders";

  return async (dispatch) => {
    dispatch (requestingData ());
    try {
      const res = await fetch (api + endpoint + params),
            data = await res.json ();
      dispatch (receivedData ());
      dispatch (storeData_country ({...data}));
    } catch (e) {
      console.log (e);
    }
  }
}

export default handleSearchRequest;