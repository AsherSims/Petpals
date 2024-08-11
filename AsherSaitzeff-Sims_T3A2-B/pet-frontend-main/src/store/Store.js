import { createStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import RootReducers from "./reducers/index";
import thunk from "redux-thunk";

const initState = {};
const middleWare = [thunk]
const composeEnhcancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(  
    RootReducers,
    initState,
    composeEnhcancers(applyMiddleware(...middleWare))
)

export default store;