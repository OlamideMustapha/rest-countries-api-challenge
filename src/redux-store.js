import { createStore, applyMiddleware } from "redux";
import thunk  from "redux-thunk";


const defaultState = {
  darkMode: false,
  fetching: false,
  countries: [],
  country: {}
};


// Actions
const REQUESTING_DATA    = "REQUESTING_DATA";
const RECEIVED_DATA      = "RECEIVED_DATA";
const STORE_DATA         = "STORE_DATA";
const STORE_DATA_COUNTRY = "STORE_DATA_COUNTRY";
const MODE = "MODE";


// Action Creators
export const requestingData = () => ({ type: REQUESTING_DATA });
export const receivedData   = () => ({ type: RECEIVED_DATA });

export const storeData      = (data) => ({ type: STORE_DATA, data: data });
export const storeData_country = (data) => ({ type: STORE_DATA_COUNTRY, data: data });
export const toggleMode = () => ( {type: MODE} );

// reducer
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUESTING_DATA:
      return { ...state, fetching: true };
    case RECEIVED_DATA:
      return { ...state, fetching: false };
    case STORE_DATA:
      return { ...state, countries: action.data };
    case STORE_DATA_COUNTRY:
      return { ...state, country: action.data[0] };
    case MODE:
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}


const store = createStore (
  reducer
, applyMiddleware (thunk));


export default store;