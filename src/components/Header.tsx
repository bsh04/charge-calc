import React, {useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from "react-native";
import {useNavigation, DrawerActions} from "@react-navigation/native"
import {Icon, Overlay} from "react-native-elements";
import {device} from "../tools/device";

interface HeaderProps {
    title: string
    isGoBack?: boolean
    isMenuOpen?: boolean
    isInfo?: boolean
    textInfo?: React.ReactNode
}


export const Header: React.FC<HeaderProps> = ({title, isGoBack, isMenuOpen, isInfo, textInfo}) => {
    const navigation = useNavigation()

    const defaultTextInfo = (
        <View>
            <Text style={{fontSize: 16, lineHeight: 23}}>Для рассчёта необходимо ввести данные в соответствующие окна.{"\n\n"}Для управления
                результирующим значением элементов перейдите на вкладку "Элементы" или&nbsp;
                <Text
                    style={styles.link}
                    onPress={() => {
                        setOpenModal(false)
                        navigation.navigate("Элементы")
                    }}>
                    нажмите сюда
                </Text>.
            </Text>
        </View>)

    const {goBack, dispatch} = useNavigation()
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <StatusBar backgroundColor={"#2962ff"}/>
            <View style={styles.container}>
                <View style={styles.leftItems}>
                    {isGoBack &&
                    <Icon name={"arrow-left"} type={"simple-line-icon"} color={"white"} onPress={() => goBack()}/>}
                    {isMenuOpen && <Icon name={"menu"} type={"entypo"} color={"white"}
                                         onPress={() => dispatch(DrawerActions.toggleDrawer())}/>}
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.rightItems}>
                    {isInfo && <Icon type={"octicon"} name={"info"} containerStyle={{paddingRight: 20}} color={"white"} onPress={() => setOpenModal(true)}/>}
                </View>
            </View>
            <Overlay overlayStyle={{width: device.width * .9}} isVisible={openModal} onBackdropPress={() => setOpenModal(false)}>
                <View style={styles.infoWrap}>
                    {textInfo ? textInfo : defaultTextInfo}
                </View>
            </Overlay>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#448aff",
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    infoWrap: {
      padding: 15
    },
    leftItems: {
        alignItems: "center",
        flexDirection: "row"
    },
    rightItems: {
        alignItems: "center",
        justifyContent: "flex-end",
        width: device.width,
        position: "absolute",
        flexDirection: "row"
    },
    link: {
      fontSize: 18,
        color: "#2196f3"
    },
    title: {
        fontSize: 20,
        paddingLeft: 10,
        color: "#fff",
    }
})