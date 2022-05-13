import {createSelector} from "reselect";
import {IState} from "./store";

export const userIdSelector = ({user}: IState) => user.userId
export const userDataSelector = ({user}: IState) => user.userData
export const userLearnedCountriesSelector = ({user}: IState) => user.userData?.learnedCountries
export const userDataLoadingSelector = ({user}: IState) => user.loading
export const userDataLoadedSelector = ({user}: IState) => user.loaded

export const countriesEntitiesSelector = ({countries}: IState) => countries.entities
export const countriesLoadingSelector = ({countries}: IState) => countries.loading
export const countriesLoadedSelector = ({countries}: IState) => countries.loaded

export const learnedCountriesSelector = ({sortedCountries}: IState) => sortedCountries.onlyLearnedCountries
export const notLearnedCountriesSelector = ({sortedCountries}: IState) => sortedCountries.onlyNotLearnedCountries
export const allCountriesSelector = ({sortedCountries}: IState) => sortedCountries.allCountries

export const learnedCountriesArraySelector = createSelector(learnedCountriesSelector, Object.values)
export const notLearnedCountriesArraySelector = createSelector(notLearnedCountriesSelector, Object.values)
export const allCountriesArraySelector = createSelector(allCountriesSelector, Object.values)
