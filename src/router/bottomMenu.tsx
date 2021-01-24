import React, {useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Elements} from "../screens/Elements"
import {Calculation} from "../screens/Calculation"
import {Icon} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {elementsSlice} from "../redux/slices/elementsSlice";

const BottomTabNavigator = createBottomTabNavigator()

const getItemsStore = async () => {
    const dispatch = useDispatch()
    const storageElements = await AsyncStorage.getItem("elements")
    if (storageElements) {
        dispatch(elementsSlice.actions.setData(JSON.parse(storageElements)))
    }
}

export const BottomMenu = () => {
    const [ready, setReady] = useState<boolean>(false)
    getItemsStore().then(() => setReady(true))

    if (ready) {
        return (
            <BottomTabNavigator.Navigator tabBarOptions={{
                style: {
                    height: 60
                },
                tabStyle: {
                    backgroundColor: "#448aff",
                    alignItems: "center",
                    justifyContent: "center",
                },
                labelStyle: {
                    color: "#fff",
                    fontSize: 16,
                }
            }}>
                <BottomTabNavigator.Screen name={"Элементы"} component={Elements} options={{
                    tabBarIcon: () => <Icon name={"chemical-weapon"} color={"white"} type={"material-community"} />,
                }} />
                <BottomTabNavigator.Screen name={"Рассчёт"} component={Calculation} options={{
                    tabBarIcon: () => <Icon name={"chemistry"} color={"white"} type={"simple-line-icon"} />
                }} />
            </BottomTabNavigator.Navigator>
        )
    }

    return null
}