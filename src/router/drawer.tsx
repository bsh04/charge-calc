import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {createStackNavigator} from "@react-navigation/stack"
import {useNavigation} from "@react-navigation/native"
import {Log} from "../screens/Log"
import {BottomMenu} from "./bottomMenu"
import {View, Text, StyleSheet} from "react-native";

const DrawerNavigator = createDrawerNavigator()

export const Drawer = () => {
    return (
        <DrawerNavigator.Navigator>
            <DrawerNavigator.Screen name={"Главная"} component={BottomMenu}/>
            <DrawerNavigator.Screen name={"Журнал"} component={Log}/>
        </DrawerNavigator.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%", flex: 1,
        padding: 20,
    }

})