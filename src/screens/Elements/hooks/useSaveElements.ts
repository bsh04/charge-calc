import {useDispatch} from "react-redux";
import {elementsSlice} from "../../../redux/slices/elementsSlice"
import {IElement} from "../../../types";
import {Alert} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveInStorage = async (data: Array<IElement>) => {
    await AsyncStorage.setItem("elements", JSON.stringify(data))
}

export const useSaveElements = () => {
    const dispatch = useDispatch()
    const save = (data: Array<IElement>) => {
        saveInStorage(data).then(() => dispatch(elementsSlice.actions.setData(data)))
        Alert.alert("Внимание", "Изменения успешно применены")
    }
    return {save}
}