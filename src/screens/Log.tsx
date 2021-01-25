import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StoreLog} from "../types";
import {Header} from "../components/Header";
import {Table} from "../components/Table";
import {Button, Icon} from "react-native-elements";
import {device} from "../tools/device";

const getStore = async () => {
    return await AsyncStorage.getItem("log")
}

const removeStoreItem = async (newData: Array<StoreLog>) => {
    await AsyncStorage.setItem("log", JSON.stringify(newData)).then(() => {
        Alert.alert("Внимание", "Изменения применены")
    })
}

export const Log = () => {
    const [ready, setReady] = useState(false)
    const [log, setLog] = useState<Array<StoreLog>>([])
    const [initData, setInitData] = useState()

    const handleFetch = () => {
        getStore().then(res => {
            if (res) {
                setInitData(JSON.parse(res))
                setLog(JSON.parse(res))
            }
            setReady(true)
        })
    }

    useEffect(() => {
        handleFetch()
    }, [])

    const handleRemove = (id: number) => {
        Alert.alert("Внимание", "Данная запись будет удалена безвозвратно", [
            {
                text: "Удалить", onPress: () => setLog([...log.filter(item => item.id !== id)]),
            },
            {
                text: "Отмена", onPress: () => {
                }, style: "cancel",
            }
        ])
    }

    return ready ? (
        <>
            <Header title={"Журнал рассчётов"} isMenuOpen isInfo
                    textInfo={<Text style={{fontSize: 16, lineHeight: 23}}>Здесь будут отображаться предыдущие результаты
                        вычислений.{"\n\n"}Для сохранения изменений нажмите <Text style={{color: "#4caf50"}}>"Применить"</Text>{"\n\n"}Для получения актуальных
                        данных нажмите <Text style={{color: "#1565c0"}}>"Обновить"</Text></Text>}/>
            <ScrollView style={styles.container}>
                {
                    log.length !== 0 ? log.map((item, index) => {
                        return (
                            <View style={styles.result} key={index}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>{item.time}</Text>
                                    <TouchableOpacity
                                        style={{flexDirection: "row", alignItems: "center", paddingBottom: 10}}
                                        onPress={() => handleRemove(item.id)}>
                                        <Text style={styles.remove}>Удалить запись</Text>
                                        <Icon name={"delete"} type={"material-community"} color={"#d32f2f"}/>
                                    </TouchableOpacity>
                                </View>
                                <Table
                                    headers={item.data.map((item) => ({value: item.value, title: item.name}))}
                                    data={item.data.map((item) => ({value: item.value, title: item.name}))}
                                />
                            </View>
                        )
                    }) : <Text style={{textAlign: "center", fontWeight: "bold", paddingTop: 20, fontSize: 20}}>
                        Записей пока что нет
                    </Text>
                }
            </ScrollView>
            <View style={{flexDirection: "row", alignItems: "center", padding: 10, justifyContent: "space-between"}}>
                <Button
                    title={"Применить"}
                    disabled={JSON.stringify(initData) === JSON.stringify(log)}
                    onPress={() => removeStoreItem(log)}
                    containerStyle={{width: "48%"}}
                    buttonStyle={{backgroundColor: "#4caf50"}}
                />
                <Button
                    title={"Обновить"}
                    onPress={handleFetch}
                    containerStyle={{width: "48%"}}
                />
            </View>
        </>
    ) : <ActivityIndicator style={styles.loading} size={40} color={"#4caf50"}/>
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        paddingBottom: 10,
        fontWeight: "bold",
    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    remove: {
        fontSize: 16,
        color: '#d32f2f'
    },
    hrCont: {
        marginTop: 10,
        width: device.width,
        alignItems: "center",
    },
    hr: {
        width: device.width * .95,
        height: 1,
        backgroundColor: "#ccc"
    },
    result: {
        paddingVertical: 10,
        borderWidth: 1,
        marginBottom: 10,
        borderColor: "#aaa",
        backgroundColor: "#ddd"
    },
    loading: {
        marginTop: 50,
    }
})