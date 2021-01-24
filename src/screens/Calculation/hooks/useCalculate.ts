import {SubstancesData} from "../../../types";
import {useDispatch, useSelector} from "react-redux";
import {resultSelectors, resultSlice} from "../../../redux/slices/resultSlice";
import {Algorithm} from "../../../tools/algorithm";

export const useCalculate = () => {
    const massAndAdmix = useSelector(resultSelectors.getData())
    const dispatch = useDispatch()
    const start = (data: Array<SubstancesData>) => {
        const result = Algorithm(data, massAndAdmix.mass, massAndAdmix.admixtures)
        dispatch(resultSlice.actions.setData(result))
    }

    return {start}
}