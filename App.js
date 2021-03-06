import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider} from 'react-redux';
import store from './src/redux/store';


import Appcontainer from './src/Appcontainer';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {

  

  return (
    <Provider store={store}>
      <Appcontainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
