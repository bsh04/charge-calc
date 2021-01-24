import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Router} from "./src/router";
import {device} from "./src/device";

export default function App() {
  return (
    <View style={styles.container}>
      <Router/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: device.height,
  },
})