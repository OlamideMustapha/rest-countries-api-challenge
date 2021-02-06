import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware  from "redux-thunk";
import { navReducer }  from "./components/nav-bar-component.js";
import { homeReducer } from "./adapters/home-adapter.js";



const rootReducers = combineReducers (
  { nav: navReducer, home: homeReducer}
);


const store = createStore (
  rootReducers
, applyMiddleware (thunkMiddleware));


store.subscribe (() => console.log (store.getState ()))

export default store;