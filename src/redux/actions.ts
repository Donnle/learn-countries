import axios from "axios";
import {ADD_USER_ID, FAILURE, LOAD_COUNTRIES, LOAD_USER_DATA, REQUEST, SORT_COUNTRIES, SUCCESS} from "./constants";
import {countriesSelector, learnedCountriesSelector} from "./selectors";

export const addUserId = (userId: string) => ({type: ADD_USER_ID, payload: userId})

export const loadUserInfo = (userId: string) => async (dispatch: any, getState: any) => {
  dispatch({type: LOAD_USER_DATA + REQUEST})
  try {
    const {data} = await axios.get(`/user/userInfo/${userId}`)
    const {username, learnedCountries} = data.user
    dispatch({type: LOAD_USER_DATA + SUCCESS, payload: {username, learnedCountries}})
  } catch (error) {
    dispatch({type: LOAD_USER_DATA + FAILURE, payload: error})
  }
}

export const loadCountries = () => async (dispatch: any, getState: any) => {
  dispatch({type: LOAD_COUNTRIES + REQUEST})
  try {
    const {data} = await axios.get('/countries/getAllCountries')
    dispatch({type: LOAD_COUNTRIES + SUCCESS, payload: data})

    const state = getState()
    const learnedCountries = learnedCountriesSelector(state)
    const allCountries = countriesSelector(state)
    dispatch({type: SORT_COUNTRIES, payload: {allCountries, learnedCountries}})
  } catch (error) {
    console.log(error)
    dispatch({type: LOAD_COUNTRIES + FAILURE, payload: error})
  }
}
