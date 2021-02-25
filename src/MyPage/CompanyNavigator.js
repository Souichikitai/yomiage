import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';

const Stack = createStackNavigator();


export default function CompanyNavigator({navigation}) {


    return(

        <Stack.Navigator 
            initialRouteName="CompanyList"
            headerMode='none'
            screenOptions={{
                headerStyle: {
                  backgroundColor: 'tomato'
                }
              }}
        >
            <Stack.Screen name ="CompanyList" component={CompanyList} headerMode='none'
                      options={{
                        title: '企業別履歴',
                        headerTintColor: 'lightgrey',
                        
                      }}
            />
            <Stack.Screen 
                name="CompanyDetail" component={CompanyDetail} options={{headerTintColor: 'lightgrey',title: "詳細"}}
            />
        </Stack.Navigator>
    );
}
