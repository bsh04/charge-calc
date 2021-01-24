import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Elements, IElement} from "../../types"

interface SliceState {
    data: Array<IElement>
}

const initialState = {
    data: [
        {
            title: Elements.silicon,
        },
        {
            title: Elements.r2o3,
        },
        {
            title: Elements.cal,
        },
        {
            title: Elements.magne,
        },
        {
            title: Elements.ro2,
        },
    ]
} as SliceState

export const elementsSlice = createSlice({
    name: "elementsSlice",
    initialState,
    reducers: {
        setData(state: SliceState, action: PayloadAction<Array<IElement>>) {
            state.data = action.payload.map(item => ({title: item.title, value: item.value === "" ? 0 : item.value}))
        }
    }
})

interface Store {
    elements: SliceState
}

export const elementsSelectors = {
    getData: () => (state: Store) => state.elements.data
}