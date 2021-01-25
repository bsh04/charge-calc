import {SubstancesData} from "../../../types";
import {useDispatch, useSelector} from "react-redux";
import {resultSelectors, resultSlice} from "../../../redux/slices/resultSlice";
import {Algorithm} from "../../../tools/algorithm";
import {elementsSelectors} from "../../../redux/slices/elementsSlice";

export const useCalculate = () => {
    const massAndAdmix = useSelector(resultSelectors.getData())
    const resultPercents = useSelector(elementsSelectors.getData())
    const dispatch = useDispatch()
    const start = (initData: Array<SubstancesData>) => {
        const data = [...initData].map((item) => ({...item, resultPercent: Number(resultPercents.find(p => p.title === item.mainElement)!.value)}))
        const result = Algorithm(data, massAndAdmix.mass, massAndAdmix.admixtures)
        dispatch(resultSlice.actions.setData(result))
    }

    return {start}
}