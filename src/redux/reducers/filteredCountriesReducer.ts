import {SORT_COUNTRIES} from "../constants";
import produce from "immer";

const initialState = {
  onlyLearnedCountries: {},
  onlyNotLearnedCountries: {},
  allCountries: {}
}

export default (state = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case SORT_COUNTRIES:
      return produce(state, (draft) => {
        const {allCountries, learnedCountries} = payload
        const onlyLearnedCountries = learnedCountries.reduce((acc: any, i: any) => ({
          ...acc,
          [i]: {
            country: allCountries[i],
            buttonBackground: '#75FF83'
          }
        }), {})
        const onlyNotLearnedCountries = Object.entries(allCountries)
          .filter(([key, value]: any) => !onlyLearnedCountries[key])
          .reduce((acc: any, [key, value]: any) => ({
            ...acc,
            [key]: {
              country: value,
              buttonBackground: '#FF7575'
            }
          }), {})

        draft.onlyLearnedCountries = onlyLearnedCountries
        draft.onlyNotLearnedCountries = onlyNotLearnedCountries
        draft.allCountries = {...onlyNotLearnedCountries, ...onlyLearnedCountries}
      })
    default:
      return state
  }
}
