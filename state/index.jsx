/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import { useMemo } from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import home from "./reducers/home";

let store;

const rootReducer = combineReducers({ home });

const init = () => {
    const __store__ = store ?? createStore(rootReducer, applyMiddleware(thunk));

    if (typeof window === "undefined") return __store__;
    if (!store) store = __store__;

    return __store__;
};

export const useStore = () => useMemo(() => init(), []);
