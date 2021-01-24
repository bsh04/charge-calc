import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements"
import {Header} from "../../components/Header";
import {useSelector} from "react-redux";
import {tableSelectors} from "../../redux/slices/tableSlice";
import {Table} from "../../components/Table";
import {elementsSelectors} from "../../redux/slices/elementsSlice";
import {Elements, IElement, Substance, SubstancesData, TableTitleView} from "../../types";
import {device} from "../../tools/device";
import {useCalculate} from "./hooks/useCalculate";
import {resultSelectors} from "../../redux/slices/resultSlice";

interface ResultTableData {
    headers: Array<IElement>
    data: Array<IElement>
}

export const Calculation: React.FC = () => {
    const iniData = useSelector(tableSelectors.getData())
    const headers = useSelector(elementsSelectors.getData())
    const result = useSelector(resultSelectors.getData())
    const {start} = useCalculate()

    const [resultTableData, setResultTableData] = useState<ResultTableData>()

    useEffect(() => {
        const data = [...result.mass.map(mas => ({title: mas.name, value: mas.value})), {
            title: Elements.ro2,
            value: result.admixtures.find(a => a.name === Substance.Spar)!.elements.find(e => e.title === Elements.ro2)!.value
        }]
        setResultTableData({data, headers: data})
    }, [result])

    const [data, setData] = useState<Array<SubstancesData>>(iniData)
    const handleCalculate = () => {
        start(data)
    }

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
                            <Text style={styles.title}>{TableTitleView[item.name]}</Text>
                            <Table data={item.elements}
                                   editable={true}
                                   mainElement={item.mainElement}
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
                <Text style={styles.title}>Результаты</Text>
                <Table data={resultTableData?.data} headers={resultTableData?.headers} editable={false}/>
            </ScrollView>
            <Button
                containerStyle={{padding: 10}}
                title={"Рассчитать"}
                onPress={handleCalculate}
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