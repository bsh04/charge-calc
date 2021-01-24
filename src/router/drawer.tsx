import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer"
import {Log} from "../screens/Log"
import {BottomMenu} from "./bottomMenu"

const DrawerNavigator = createDrawerNavigator()

export const Drawer = () => {
    return (
        <DrawerNavigator.Navigator drawerType={"slide"}>
            <DrawerNavigator.Screen name={"Главная"} component={BottomMenu}/>
            <DrawerNavigator.Screen name={"Журнал"} component={Log}/>
        </DrawerNavigator.Navigator>
    )
}