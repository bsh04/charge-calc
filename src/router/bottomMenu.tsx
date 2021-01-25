import React, {useState} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Elements} from "../screens/Elements/Elements"
import {Calculation} from "../screens/Calculation/Calculation"
import {Icon, Text} from "react-native-elements";
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
                    tabBarLabel: ({focused}) => <Text style={{color: "white", fontSize: 16, opacity: !focused ? 0.6 : 1}}>Элементы</Text>,
                    tabBarIcon: ({focused}) => <Icon name={"chemical-weapon"} color={"white"} type={"material-community"} style={{opacity: !focused ? 0.6 : 1}}  />,
                }} />
                <BottomTabNavigator.Screen name={"Рассчёт"} component={Calculation} options={{
                    tabBarLabel: ({focused}) => <Text style={{color: "white", fontSize: 16, opacity: !focused ? 0.6 : 1}}>Рассчёт</Text>,
                    tabBarIcon: ({focused}) => <Icon name={"calculator"} color={"white"} type={"font-awesome"} style={{opacity: !focused ? 0.6 : 1}} />
                }} />
            </BottomTabNavigator.Navigator>
        )
    }

    return null
}