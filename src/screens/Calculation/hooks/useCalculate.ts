import {Elements, IAdmixtures, IMass, Substance, SubstancesData} from "../../../types";
import {useDispatch, useSelector} from "react-redux";
import {resultSelectors, resultSlice} from "../../../redux/slices/resultSlice";
import {Algorithm} from "../../../tools/algorithm";
import {elementsSelectors} from "../../../redux/slices/elementsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveStorage = async (initData: {mass: IMass[], admixtures: IAdmixtures[]}) => {
    let data = [{
        id: Date.now(),
        time: String(new Date(Date.now()).toLocaleDateString() + " " + new Date(Date.now()).toLocaleTimeString()),
        data: [
            ...initData.mass,
            {
                name: Elements.ro2,
                value: initData.admixtures.find(a => a.name === Substance.Spar)!.elements.find(e => e.title === Elements.ro2)!.value
            }
        ]
    }]
    await AsyncStorage.getItem("log").then((res) => {
        if (res) {
            data = [...data, ...JSON.parse(res)]
        }
    }).then(() => AsyncStorage.setItem("log", JSON.stringify(data)))
}

export const useCalculate = () => {
    const massAndAdmix = useSelector(resultSelectors.getData())
    const resultPercents = useSelector(elementsSelectors.getData())
    const dispatch = useDispatch()
    const start = (initData: Array<SubstancesData>) => {
        const data = [...initData].map((item) => ({...item, resultPercent: Number(resultPercents.find(p => p.title === item.mainElement)!.value)}))
        const result = Algorithm(data, massAndAdmix.mass, massAndAdmix.admixtures)
        saveStorage(result).then(() => dispatch(resultSlice.actions.setData(result)))
    }

    return {start}
}