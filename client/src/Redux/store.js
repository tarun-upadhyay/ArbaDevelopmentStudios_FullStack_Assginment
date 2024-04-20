import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";

import { reducer as AuthReducer } from "./Auth/reducer";
import { reducer as CartReducer } from "./Cart/reducer";

const rootReducer = combineReducers({ AuthReducer, CartReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
