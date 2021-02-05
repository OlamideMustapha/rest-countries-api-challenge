import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware  from "redux-thunk";
import { navReducer } from "./components/nav-bar-component.js";
import { searchReducer } from "./components/home-component.js";



const rootReducers = combineReducers ({ nav: navReducer, home: searchReducer});


const store = createStore (
  rootReducers
, applyMiddleware (thunkMiddleware));


store.subscribe (() => console.log (store.getState ()))

export default store;