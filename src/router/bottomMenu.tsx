import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {Elements} from "../screens/Elements"
import {Calculation} from "../screens/Calculation"
import {Icon} from "react-native-elements";

const BottomTabNavigator = createBottomTabNavigator()

export const BottomMenu = () => {
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