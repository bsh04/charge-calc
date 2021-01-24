import {combineReducers} from "redux";
import {elementsSlice} from "./slices/elementsSlice"

export const rootReducer = combineReducers({
    elements: elementsSlice.reducer
})