import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Router} from "./src/router";
import {device} from "./src/device";
import {Provider} from "react-redux";
import {store} from "./src/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Router/>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: device.height,
    },
})