import axios from "axios";
import {ADD_USER_ID, FAILURE, LOAD_COUNTRIES, LOAD_USER_DATA, REQUEST, SORT_COUNTRIES, SUCCESS} from "./constants";

export const addUserId = (userId: string) => ({type: ADD_USER_ID, payload: userId})

export const loadUserInfo = (userId: string) => async (dispatch: any, getState: any) => {
  dispatch({type: LOAD_USER_DATA + REQUEST})
  dispatch({type: LOAD_COUNTRIES + REQUEST})
  try {
    const {data} = await axios.get(`/user/userInfo/${userId}`)
    const {username, learnedCountries} = data.user

    dispatch({type: LOAD_USER_DATA + SUCCESS, payload: {username, learnedCountries}})

    const dataCountries = await axios.get('/countries/getAllCountries').then(res => res.data)
    dispatch({type: LOAD_COUNTRIES + SUCCESS, payload: dataCountries})

    const state = getState()
    dispatch({type: SORT_COUNTRIES, payload: {allCountries: state.countries.entities, learnedCountries}})
  } catch (error) {
    dispatch({type: LOAD_USER_DATA + FAILURE, payload: error})
  }
}

// export const loadCountries = () => async (dispatch: any, getState: any) => {
//   const state = getState()
//   dispatch({type: LOAD_COUNTRIES + REQUEST})
//   try {
//     const data = await axios.get('/countries/getAllCountries').then(res => res.data)
//     dispatch({type: LOAD_COUNTRIES + SUCCESS, payload: data})
//     const learnedCountries = learnedCountriesSelector(state)
//     console.log(learnedCountries)
//     dispatch({type: SORT_COUNTRIES, payload: {allCountries: data, learnedCountries}})
//   } catch (error) {
//     console.log(error)
//     dispatch({type: LOAD_COUNTRIES + FAILURE, payload: error})
//   }
// }
