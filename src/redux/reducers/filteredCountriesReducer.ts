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
    default:
      return state
  }
}
