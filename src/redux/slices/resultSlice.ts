import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Elements, IAdmixtures, IElement, IMass, Substance} from "../../types";

interface SliceState {
    mass: Array<IMass>
    admixtures: Array<IAdmixtures>
}

const initialState = {
    admixtures: [
        {
            name: Substance.Sand,
            elements: [
                {
                    title: Elements.silicon,
                    value: 0,
                },
                {
                    title: Elements.r2o3,
                    value: 0,
                },
                {
                    title: Elements.cal,
                    value: 0,
                },
                {
                    title: Elements.magne,
                    value: 0,
                },
                {
                    title: Elements.ro2,
                    value: 0,
                },
            ]
        },
        {
            name: Substance.Spar,
            elements: [
                {
                    title: Elements.silicon,
                    value: 0,
                },
                {
                    title: Elements.r2o3,
                    value: 0,
                },
                {
                    title: Elements.cal,
                    value: 0,
                },
                {
                    title: Elements.magne,
                    value: 0,
                },
                {
                    title: Elements.ro2,
                    value: 0,
                },
            ]
        },
        {
            name: Substance.Marble,
            elements: [
                {
                    title: Elements.silicon,
                    value: 0,
                },
                {
                    title: Elements.r2o3,
                    value: 0,
                },
                {
                    title: Elements.cal,
                    value: 0,
                },
                {
                    title: Elements.magne,
                    value: 0,
                },
                {
                    title: Elements.ro2,
                    value: 0,
                },
            ]
        },
        {
            name: Substance.Dolomite,
            elements: [
                {
                    title: Elements.silicon,
                    value: 0,
                },
                {
                    title: Elements.r2o3,
                    value: 0,
                },
                {
                    title: Elements.cal,
                    value: 0,
                },
                {
                    title: Elements.magne,
                    value: 0,
                },
                {
                    title: Elements.ro2,
                    value: 0,
                },
            ]
        },
    ],
    mass: [
        {
            name: Substance.Spar,
            value: 0,
        },
        {
            name: Substance.Sand,
            value: 0,
        },
        {
            name: Substance.Marble,
            value: 0,
        },
        {
            name: Substance.Dolomite,
            value: 0,
        },
    ]
} as SliceState

export const resultSlice = createSlice({
    name: "resultSlice",
    initialState,
    reducers: {
        setData(state: SliceState, action: PayloadAction<SliceState>) {
            state.mass = action.payload.mass
            state.admixtures = action.payload.admixtures
        },
    }
})

interface Store {
    result: SliceState
}

export const resultSelectors = {
    getData: () => (state: Store) => state.result
}