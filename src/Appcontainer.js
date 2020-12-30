import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector, useDispatch } from 'react-redux';

import Start from './Start';

import Authscreen from './Authscreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function Appcontainer() {

// 気づいたが、変数名とinitial state のバリューは一緒じゃなきゃいけないらしい
// ここでは、グローバル変数をreduxのストアから撮ってくる処理
  const usernameState = useSelector((state) => state.usernameState);

  const dispatch = useDispatch();


const setusertrue = () => {

    // react redux でグローバルステイトをtrueに変えている
    dispatch({type: "CHANGE_USER_STATE_TRUE"})
}

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserName')
      if( value !== null) {
       
        setusertrue();
        console.log(usernameState);

      }else{
        setUserstate(false)
    
      }
    } catch(e) {
    
    }
  }

  useEffect(() => {
    console.log(usernameState)
    getData()
    
  },[]);

  return (

    

      <NavigationContainer>

        
        <Stack.Navigator
            screenOptions={{
                backgroundColor: 'tomato',
                
            }}
            
            headerMode='none'
            
        >
          {usernameState == false ?(
          <Stack.Screen 
            name="Start" 
            component={Start} 
            options={{
                title: 'まず初めに'
                
            }}
            
          />
          ):(
            <Stack.Screen 
                name="Main" 
                component={Authscreen} 
                options = {{
                    headerTitle: '就活面接　読み上げアプリ',
                    backgroundColor: 'tomato'                 
                }}
            />
          )}
          
        </Stack.Navigator>
      </NavigationContainer>


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
