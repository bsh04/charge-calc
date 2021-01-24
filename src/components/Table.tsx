import React from 'react';
import {Elements, ElementsView, IElement, SubstancesData, SubstanceView, TableTitleView} from "../types";
import {View, StyleSheet, Text, TextInput} from "react-native";

interface TableProps {
    data?: Array<IElement>
    headers?: Array<IElement>
    setData?: (element: Elements, value: number | string) => void
    mainElement?: Elements
    editable?: boolean
}

export const Table: React.FC<TableProps> = ({data, headers, setData, mainElement, editable}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headers}>
                {headers?.map((item, index) => (
                    <View style={[styles.header, {borderRightWidth: index + 1 === headers.length ? 0 : 1}]} key={index}>
                        <Text style={[styles.textHeader, {color: "#fff"}]}>{TableTitleView[item.title]}</Text>
                    </View>
                ))}
            </View>
            <View style={[{flexDirection: "row", backgroundColor: "#b0bec5", height: 30}]}>
                {data?.map((item, index) => (
                    <View style={[styles.header, {borderRightWidth: index + 1 === headers?.length ? 0 : 1, backgroundColor: item.title === mainElement ? "#81c784" : "#b0bec5"}]} key={index}>
                        <TextInput
                            editable={editable}
                            value={item.value ? String(item.value) : undefined}
                            placeholder={"0"}
                            style={{fontWeight: !editable ? "bold" : "400", color: !editable ? "#1a237e" : "#111"}}
                            keyboardType={"numeric"}
                            onChange={(e) => setData ? setData(item.title as Elements, e.nativeEvent.text) : {}}
                            textAlign={"center"}
                            selectionColor={"#546e7a"}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        borderColor: "#111",
        borderWidth: 1,
    },
    headers: {
        height: 30,
        borderBottomWidth: 1,
        backgroundColor: "#90a4ae",
        flexDirection: "row",
    },
    header: {
        width: "20%",
    },
    textHeader: {
        textAlign: "center",
        height: "100%",
        textAlignVertical: "center",
    }
})