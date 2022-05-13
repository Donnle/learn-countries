import {createSelector} from "reselect";
import {IState} from "./store";

export const userIdSelector = ({user}: IState) => user.userId
export const userDataSelector = ({user}: IState) => user.userData
export const learnedCountriesSelector = ({user}: IState) => user.userData?.learnedCountries

export const userLoadingSelector = ({user}: IState) => user.loading
export const userLoadedSelector = ({user}: IState) => user.loaded


export const countriesSelector = ({countries}: IState) => countries.entities
export const loadingCountriesSelector = ({countries}: IState) => countries.loading
export const loadedCountriesSelector = ({countries}: IState) => countries.loaded

export const filteredObjectLearnedCountriesSelector = ({filteredCountries}: IState) => filteredCountries.onlyLearnedCountries
export const filteredObjectNotLearnedCountriesSelector = ({filteredCountries}: IState) => filteredCountries.onlyNotLearnedCountries
export const filteredObjectAllCountriesSelector = ({filteredCountries}: IState) => filteredCountries.allCountries


export const filteredLearnedCountriesSelector = createSelector(
  filteredObjectLearnedCountriesSelector,
  Object.values
)
export const filteredNotLearnedCountriesSelector = createSelector(
  filteredObjectNotLearnedCountriesSelector,
  Object.values
)
export const filteredAllCountriesSelector = createSelector(
  filteredObjectAllCountriesSelector,
  Object.values
)
