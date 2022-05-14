import produce from "immer";
import {IFilteredCountries} from "../store";
import {ADD_LEARNED_COUNTRY, REMOVE_LEARNED_COUNTRY, SORT_COUNTRIES} from "../constants";
import * as _ from "lodash";

const initialState: IFilteredCountries = {
  onlyLearnedCountries: {},
  onlyNotLearnedCountries: {},
  allCountries: {}
}

// eslint-disable-next-line
export default (state = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case SORT_COUNTRIES:
      return produce(state, (draft) => {
        let {allCountries, learnedCountries} = payload

        const onlyLearnedCountries = learnedCountries
          .reduce((acc: object, countryId: string) => ({
            ...acc,
            [countryId]: {
              country: allCountries[countryId],
              isLearned: true
            }
          }), {})

        const onlyNotLearnedCountries = Object.values(allCountries)
          .filter(({_id}: any) => !onlyLearnedCountries[_id])
          .reduce((acc: object, country: any) => ({
            ...acc,
            [country._id]: {
              country,
              isLearned: false
            }
          }), {})

        draft.onlyLearnedCountries = onlyLearnedCountries
        draft.onlyNotLearnedCountries = onlyNotLearnedCountries
        draft.allCountries = {...onlyNotLearnedCountries, ...onlyLearnedCountries}
      })
    case ADD_LEARNED_COUNTRY:
      return produce(state, (draft) => {
        const {countryId} = payload
        draft.onlyLearnedCountries[countryId] = {country: draft.allCountries[countryId].country, isLearned: true}
        draft.onlyNotLearnedCountries = _.omit(draft.onlyNotLearnedCountries, [countryId])
        draft.allCountries = {...draft.onlyNotLearnedCountries, ...draft.onlyLearnedCountries}
      })
    case REMOVE_LEARNED_COUNTRY:
      return produce(state, (draft) => {
        const {countryId} = payload
        draft.onlyLearnedCountries = _.omit(draft.onlyLearnedCountries, [countryId])
        draft.onlyNotLearnedCountries[countryId] = {...draft.allCountries[countryId], isLearned: false}
        draft.allCountries = {...draft.onlyNotLearnedCountries, ...draft.onlyLearnedCountries}
      })
    default:
      return state
  }
}
