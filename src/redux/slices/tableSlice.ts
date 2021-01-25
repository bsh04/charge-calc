import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Elements, IElement, Substance, SubstancesData} from "../../types";

interface SliceState {
    data: Array<SubstancesData>
}

const initialState = {
    data: [
        {
            name: Substance.Sand,
            mainElement: Elements.silicon,
            resultPercent: 0,
            elements: [
                {
                    title: Elements.silicon,
                    value: 99.35
                },
                {
                    title: Elements.r2o3,
                    value: 0.139
                },
                {
                    title: Elements.cal,
                    value: 0
                },
                {
                    title: Elements.magne,
                    value: 0
                },
                {
                    title: Elements.ro2,
                    value: 0
                },
            ]
        },
        {
            name: Substance.Spar,
            mainElement: Elements.r2o3,
            resultPercent: 0,
            elements: [
                {
                    title: Elements.silicon,
                    value: 59.3
                },
                {
                    title: Elements.r2o3,
                    value: 23.7
                },
                {
                    title: Elements.cal,
                    value: 0.8
                },
                {
                    title: Elements.magne,
                    value: 0.15
                },
                {
                    title: Elements.ro2,
                    value: 15.2
                },
            ]
        },
        {
            name: Substance.Marble,
            mainElement: Elements.cal,
            resultPercent: 0,
            elements: [
                {
                    title: Elements.silicon,
                    value: 2.8
                },
                {
                    title: Elements.r2o3,
                    value: 0.15
                },
                {
                    title: Elements.cal,
                    value: 53.4
                },
                {
                    title: Elements.magne,
                    value: 0.7
                },
                {
                    title: Elements.ro2,
                    value: 0
                },
            ]
        },
        {
            name: Substance.Dolomite,
            mainElement: Elements.magne,
            resultPercent: 0,
            elements: [
                {
                    title: Elements.silicon,
                    value: 0.94
                },
                {
                    title: Elements.r2o3,
                    value: 0.36
                },
                {
                    title: Elements.cal,
                    value: 30
                },
                {
                    title: Elements.magne,
                    value: 20
                },
                {
                    title: Elements.ro2,
                    value: 0
                },
            ]
        }
    ]
} as SliceState

export const tableSlice = createSlice({
    name: "tableSlice",
    initialState,
    reducers: {
        setData(state: SliceState, action: PayloadAction<Array<SubstancesData>>) {
            state.data = action.payload
        },
    }
})

interface Store {
    table: SliceState
}

export const tableSelectors = {
    getData: () => (state: Store) => state.table.data
}