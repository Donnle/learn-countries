import {USER_INFO} from "./constants";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(USER_INFO)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(USER_INFO, serializedState)
  } catch (err) {
    // Ignore write errors
  }
}
