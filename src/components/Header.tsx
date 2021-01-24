import React from 'react';
import {View, StyleSheet, Text, StatusBar} from "react-native";
import {useNavigation, DrawerActions} from "@react-navigation/native"
import {Icon} from "react-native-elements";

interface HeaderProps {
    title: string
    isGoBack?: boolean
    isMenuOpen?: boolean
}

export const Header: React.FC<HeaderProps> = ({title, isGoBack, isMenuOpen}) => {

    const {goBack, dispatch} = useNavigation()
    return (
        <>
            <StatusBar backgroundColor={"#2962ff"}/>
            <View style={styles.container}>
                <View style={styles.leftItems}>
                    {isGoBack && <Icon name={"arrow-left"} type={"simple-line-icon"} color={"white"} onPress={() => goBack()}/>}
                    {isMenuOpen && <Icon name={"menu"} type={"entypo"} color={"white"} onPress={() => dispatch(DrawerActions.toggleDrawer())}/>}
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#448aff",
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    leftItems: {
        alignItems: "center",
        flexDirection: "row"
    },
    title: {
        fontSize: 20,
        paddingLeft: 10,
        color: "#fff",
    }
})