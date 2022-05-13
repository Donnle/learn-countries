import produce from "immer";
import {ADD_USER_ID, FAILURE, LOAD_USER_DATA, REQUEST, SUCCESS, USER_INFO} from "../constants";

interface IUserData {
  username?: string
  learnedCountries?: Array<string>
}

interface IInitialState {
  userId: string | null
  userData: IUserData | null
  loading: boolean
  loaded: boolean
  error: null | object
}

const initialState: IInitialState = {
  userId: JSON.parse(localStorage.getItem(USER_INFO)!) || null,
  userData: null,
  loading: false,
  loaded: false,
  error: null
}

// eslint-disable-next-line
export default (state = initialState, action: any) => {
  const {type, payload} = action
  switch (type) {
    case LOAD_USER_DATA + REQUEST:
      return produce(state, (draft) => {
        draft.loading = true
        draft.loaded = false
        draft.error = null
      })
    case LOAD_USER_DATA + SUCCESS:
      return produce(state, (draft) => {
        draft.userData = payload
        draft.loading = false
        draft.loaded = true
      })
    case LOAD_USER_DATA + FAILURE:
      return produce(state, (draft) => {
        draft.loading = false
        draft.loaded = false
        draft.error = payload
      })

    case ADD_USER_ID:
      return produce(state, (draft) => {
        draft.userId = payload
      })
    default:
      return state
  }
}
