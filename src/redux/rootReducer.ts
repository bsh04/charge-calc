import {combineReducers} from "redux";
import {elementsSlice} from "./slices/elementsSlice"
import {tableSlice} from "./slices/tableSlice"

export const rootReducer = combineReducers({
    elements: elementsSlice.reducer,
    table: tableSlice.reducer
})