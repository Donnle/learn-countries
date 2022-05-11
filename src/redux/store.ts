import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {loadState, saveState} from "./localStorage";

const persistedState = loadState()
export const store = createStore(reducers, persistedState, composeWithDevTools(applyMiddleware(thunk)))
store.subscribe(() => saveState(store.getState().user.userId))
