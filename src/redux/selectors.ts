import {createSelector} from "reselect";
import {IFilteredCountry, IState} from "./store";

export const userIdSelector = ({user}: IState) => user.userId
export const userDataSelector = ({user}: IState) => user.userData
export const userLearnedCountriesSelector = ({user}: IState) => user.userData?.learnedCountries
export const userDataLoadingSelector = ({user}: IState) => user.loading
export const userDataLoadedSelector = ({user}: IState) => user.loaded

export const countriesEntitiesSelector = ({countries}: IState) => countries.entities
export const countriesLoadingSelector = ({countries}: IState) => countries.loading
export const countriesLoadedSelector = ({countries}: IState) => countries.loaded

export const learnedCountriesSelector = createSelector(countriesEntitiesSelector, (res) =>
  Object.values(res).filter(({isLearned}: IFilteredCountry) => isLearned)
)
export const notLearnedCountriesSelector = createSelector(countriesEntitiesSelector, (res) =>
  Object.values(res).filter(({isLearned}: IFilteredCountry) => !isLearned)
)
export const allCountriesSelector = createSelector(countriesEntitiesSelector, Object.values)
