import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from "react-native";
import {Button} from "react-native-elements"
import {Header} from "../../components/Header";
import {useSelector} from "react-redux";
import {tableSelectors} from "../../redux/slices/tableSlice";
import {Table} from "../../components/Table";
import {elementsSelectors} from "../../redux/slices/elementsSlice";
import {Elements, SubstancesData, SubstanceView} from "../../types";
import {device} from "../../device";

export const Calculation: React.FC = () => {
    const iniData = useSelector(tableSelectors.getData())
    const headers = useSelector(elementsSelectors.getData())

    const [data, setData] = useState<Array<SubstancesData>>(iniData)
    return (
        <>
            <Header isMenuOpen title={"Рассчёт"}/>
            <ScrollView style={styles.container}>
                {
                    data.map((item, index) => (
                        <View key={index} style={{
                            paddingTop: index === 0 ? 0 : 10,
                            paddingBottom: index + 1 === data.length ? 20 : 0
                        }}>
                            <Text style={styles.title}>{SubstanceView[item.name]}</Text>
                            <Table data={item.elements}
                                   setData={(element: Elements, value: number | string) => setData((prev) => prev.map((sub, key) => index === key ? ({
                                       ...sub,
                                       elements: [...sub.elements].map((e) => e.title === element ? ({
                                           ...e,
                                           value: value
                                       }) : ({...e}))
                                   }) : {...sub}))}
                                   headers={headers}/>
                        </View>
                    ))
                }
            </ScrollView>
            <Button
                containerStyle={{padding: 10}}
                title={"Рассчитать"}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: device.height,
    },
    title: {
        fontSize: 16,
        paddingVertical: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
})