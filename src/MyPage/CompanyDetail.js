import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


// import CompanyList from './CompanyList';
// import CompanyDetail from './CompanyDetail';

const Stack = createStackNavigator();


export default function CompanyDetail({navigation}) {


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.modoru}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CompanyList')
                }}>
                    <Text style={{color: 'tomato'}}>＜戻る</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listbutton}>
                <Text>test each company list</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gainsboro',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    listbutton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modoru: {
        margin: 8,
    }

  });