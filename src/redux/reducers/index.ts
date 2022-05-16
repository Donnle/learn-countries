import {combineReducers} from "redux";
import userReducer from "./userReducer";
import countriesReducer from "./countriesReducer";

export default combineReducers({
  user: userReducer,
  countries: countriesReducer,
})
