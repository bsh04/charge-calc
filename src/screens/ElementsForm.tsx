import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Elements, ElementsView, IElement} from "../types";

export interface ElementsProps {
    data: Array<IElement>
    setData: (key: Elements, value: number | string) => void
}

export const ElementsForm: React.FC<ElementsProps> = ({data, setData}) => {
    return (
        <View>
            {
                data.map((item, index) => {
                    return (
                        <View style={styles.inputCont} key={index}>
                            {/*@ts-ignore*/}
                            <Text style={styles.inputLabel}>{ElementsView[item.title]}</Text>
                            <TextInput
                                onChange={(e) => setData(item.title, e.nativeEvent.text)}
                                value={item.value ? String(item.value) : undefined}
                                keyboardType={"numeric"}
                                style={styles.input}
                                placeholder={"0"}
                            />
                        </View>
                    )
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
    },
    inputLabel: {
        paddingBottom: 5,
        fontSize: 16,
    },
    inputCont: {
        paddingBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: "50%",
        padding: 5,
        borderColor: "#111"
    }
})
