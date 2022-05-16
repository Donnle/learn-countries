import axios from "axios";
import {
  ADD_LEARNED_COUNTRY,
  ADD_USER_ID,
  FAILURE,
  LOAD_COUNTRIES,
  LOAD_USER_DATA, REMOVE_LEARNED_COUNTRY,
  REQUEST,
  SUCCESS
} from "./constants";
import {
  userLearnedCountriesSelector
} from "./selectors";

export const addUserId = (userId: string) => ({type: ADD_USER_ID, payload: userId})

export const loadUserInfo = (userId: string) => async (dispatch: any) => {
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
    const state = getState()
    const learnedCountries = userLearnedCountriesSelector(state)
    dispatch({type: LOAD_COUNTRIES + SUCCESS, payload: {data, learnedCountries}})
  } catch (error) {
    console.log(error)
    dispatch({type: LOAD_COUNTRIES + FAILURE, payload: error})
  }
}


export const addLearnedCountry = ({countryId}: any) => async (dispatch: any, getState: any) => {
  try {
    const {user} = getState()
    const {userId} = user

    await axios.put('/user/addLearnedCountry', {userId, countryId})
    dispatch({type: ADD_LEARNED_COUNTRY, payload: {countryId}})
  } catch (error) {
    console.log(error)
  }
}

export const removeLearnedCountry = ({countryId}: any) => async (dispatch: any, getState: any) => {
  try {
    const {user} = getState()
    const {userId} = user
    await axios.put('/user/removeLearnedCountry', {userId, countryId})
    dispatch({type: REMOVE_LEARNED_COUNTRY, payload: {countryId}})
  } catch (error) {
    console.log(error)
  }
}
