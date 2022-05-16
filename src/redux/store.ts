import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducers from "./reducers";
import {loadState, saveState} from "./localStorage";

export interface IUserData {
  username?: string
  learnedCountries?: Array<string>
}

export interface IUser {
  userId: string
  userData: null | IUserData
  loading: boolean
  loaded: boolean
  error: null
}

export interface ICountry {
  _id: string
  name: string
  flag: string
}

export interface IFilteredCountry {
  country: ICountry
  isLearned: boolean
}

export interface ICountries {
  entities: {
    [key: string]: IFilteredCountry
  }
  loading: boolean
  loaded: boolean
  error: null | object
}

export interface IState {
  user: IUser
  countries: ICountries
}

const persistedState = loadState()
export const store = createStore(reducers, persistedState, composeWithDevTools(applyMiddleware(thunk)))
store.subscribe(() => saveState(store.getState().user.userId))
