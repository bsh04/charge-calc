import {combineReducers} from "redux";
import {elementsSlice} from "./slices/elementsSlice"
import {tableSlice} from "./slices/tableSlice"
import {resultSlice} from "./slices/resultSlice";

export const rootReducer = combineReducers({
    elements: elementsSlice.reducer,
    table: tableSlice.reducer,
    result: resultSlice.reducer,
})