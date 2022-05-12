import {createSelector} from "reselect";

export const userIdSelector = ({user}: any) => user.userId
export const userDataSelector = ({user}: any) => user.userData
export const learnedCountriesSelector = ({user}: any) => user.userData.learnedCountries

export const userLoadingSelector = ({user}: any) => user.loading
export const userLoadedSelector = ({user}: any) => user.loaded


export const countriesSelector = ({countries}: any) => countries.entities
export const loadingCountriesSelector = ({countries}: any) => countries.loading
export const loadedCountriesSelector = ({countries}: any) => countries.loaded

export const filteredObjectLearnedCountriesSelector = ({filteredCountries}: any) => filteredCountries.onlyLearnedCountries
export const filteredObjectNotLearnedCountriesSelector = ({filteredCountries}: any) => filteredCountries.onlyNotLearnedCountries
export const filteredObjectAllCountriesSelector = ({filteredCountries}: any) => filteredCountries.allCountries


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
