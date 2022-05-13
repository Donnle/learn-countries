import {combineReducers} from "redux";
import userReducer from "./userReducer";
import countriesReducer from "./countriesReducer";
import filteredCountriesReducer from "./filteredCountriesReducer";

export default combineReducers({
  user: userReducer,
  countries: countriesReducer,
  sortedCountries: filteredCountriesReducer
})
