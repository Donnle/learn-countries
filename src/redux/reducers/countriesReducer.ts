import produce from "immer";
import {ICountries} from "../store";
import {FAILURE, LOAD_COUNTRIES, REQUEST, SUCCESS} from "../constants";

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
        draft.entities = payload.reduce((acc: any, item: any) => ({...acc, [item._id]: item}), {})
        draft.loading = false
        draft.loaded = true
      })
    case LOAD_COUNTRIES + FAILURE:
      return produce(state, (draft) => {
        draft.loading = false
        draft.loaded = false
        draft.error = payload
      })
    default:
      return state
  }
}
