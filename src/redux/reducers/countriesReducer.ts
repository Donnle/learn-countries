import produce from "immer";
import {ICountries} from "../store";
import {ADD_LEARNED_COUNTRY, FAILURE, LOAD_COUNTRIES, REMOVE_LEARNED_COUNTRY, REQUEST, SUCCESS} from "../constants";

const initialState: ICountries = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
}

// eslint-disable-next-line
export default (state = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_COUNTRIES + REQUEST:
      return produce(state, (draft) => {
        draft.loading = true
        draft.loaded = false
        draft.error = null
      })
    case LOAD_COUNTRIES + SUCCESS:
      return produce(state, (draft) => {
        const {data, learnedCountries} = payload
        draft.entities = data.reduce((acc: any, item: any) => ({
          ...acc,
          [item._id]: {
            country: item,
            isLearned: learnedCountries.includes(item._id)
          }
        }), {})
        draft.loading = false
        draft.loaded = true
      })
    case LOAD_COUNTRIES + FAILURE:
      return produce(state, (draft) => {
        draft.loading = false
        draft.loaded = false
        draft.error = payload
      })
    case ADD_LEARNED_COUNTRY:
      return produce(state, (draft) => {
        const {countryId} = payload
        draft.entities[countryId].isLearned = true
      })
    case REMOVE_LEARNED_COUNTRY:
      return produce(state, (draft) => {
        const {countryId} = payload
        draft.entities[countryId].isLearned = false
      })
    default:
      return state
  }
}
