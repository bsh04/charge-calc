import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StoreLog} from "../types";
import {Header} from "../components/Header";
import {Table} from "../components/Table";
import {Button, Icon} from "react-native-elements";

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
    useEffect(() => {
        getStore().then(res => {
            if (res) {
                setInitData(JSON.parse(res))
                setLog(JSON.parse(res))
            }
            setReady(true)
        })
    }, [])

    const handleRemove = (id: number) => {
        Alert.alert("Внимание", "Данная запись будет удалена безвозвратно", [
            {
                text: "Удалить", onPress: () => setLog([...log.filter(item => item.id !== id)]),
            },
            {
                text: "Отмена", onPress: () => {}, style: "cancel",
            }
        ])
    }

    return ready ? (
        <>
            <Header title={"Журнал рассчётов"} isMenuOpen/>
            <ScrollView style={styles.container}>
                {
                    log.map((item, index) => {
                        return (
                            <View style={styles.result} key={index}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>{item.time}</Text>
                                    <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => handleRemove(item.id)}>
                                        <Text style={styles.remove}>Удалить запись</Text>
                                        <Icon name={"delete"} type={"material-community"} color={"#d32f2f"} />
                                    </TouchableOpacity>
                                </View>
                                <Table
                                    headers={item.data.map((item) => ({value: item.value, title: item.name}))}
                                    data={item.data.map((item) => ({value: item.value, title: item.name}))}
                                />
                            </View>
                        )
                    })
                }
            </ScrollView>
            <Button
                title={"Сохранить изменения"}
                disabled={JSON.stringify(initData) === JSON.stringify(log)}
                containerStyle={{padding: 10}}
                onPress={() => removeStoreItem(log)}
            />
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
        paddingVertical: 10,
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
    result: {
        paddingBottom: 20,
    },
    loading: {
        marginTop: 50,
    }
})