import {NavigationContainer} from "@react-navigation/native"
import {Drawer} from "./drawer"
import React from "react";

export const Router = () => {
    return (
        <NavigationContainer>
            <Drawer/>
        </NavigationContainer>
    )
}