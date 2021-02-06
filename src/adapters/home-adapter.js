

// filter request
// https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}

// home: https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;flag

// country: https://restcountries.eu/rest/v2/all?fields=name;population;capital;region;flag;nativeName;subregion;topLevelDomain;currencies;languages;borders


// all https://restcountries.eu/rest/v2/all
// search by name: https://restcountries.eu/rest/v2/name/{name}
// search by fullName: https://restcountries.eu/rest/v2/name/{name}?fullText=true
// search by region: https://restcountries.eu/rest/v2/region/{region}





const al = {
  capital: "Algiers",
  flag: "https://restcountries.eu/data/dza.svg",
  name: "Algeria",
  population: 40400000,
  region: "Africa"
}


const defaultState = {
  fetching: false,
  countries: [],
  country: {}
};


// Actions
const REQUESTING_DATA    = "REQUESTING_DATA";
const RECEIVED_DATA      = "RECEIVED_DATA";
const STORE_DATA         = "STORE_DATA";
const STORE_DATA_COUNTRY = "STORE_DATA_COUNTRY";


// Action Creators
const requestingData = () => ({ type: REQUESTING_DATA });
const receivedData   = () => ({ type: RECEIVED_DATA });

const storeData         = (data) => ({ type: STORE_DATA, data: data });
const storeData_country = (data) => ({ type: STORE_DATA_COUNTRY, data: data });



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
    console.log (api)
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



// reducer
export const homeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUESTING_DATA:
      return { ...state, fetching: true };
    case RECEIVED_DATA:
      return { ...state, fetching: false };
    case STORE_DATA:
      return { ...state, countries: action.data };
    case STORE_DATA_COUNTRY:
      return { ...state, country: action.data[0] };
    default:
      return state;
  }
}

export default homeReducer;