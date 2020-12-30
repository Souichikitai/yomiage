import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Home';
import Yomiage from './Yomiage';
import Setting from './Setting';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(
  // Home: {
  //   tabBarOptions: {
  //     tabStyle: {
  //       backgroundColor:'red'
  //     }
  //   }
  // }
);



const createYomiageStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'tomato'
      }
    }}
    
  >
    <Stack.Screen name="Yomiage" component={Yomiage} />
  </Stack.Navigator>
)

const createSettingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'tomato'
      }
    }}
  >
    <Stack.Screen name="Setting" component={Setting} />
  </Stack.Navigator>
)


const createHomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'tomato'
      }
    }}
  >
    <Stack.Screen 
      name="Home" component={Home}
      options={{
        title: 'ホーム'
      }}
    />
  </Stack.Navigator>

)


export default function Authscreen() {

  const [username, setUsername] = useState("");

  const getUsername = async() => {
    const value = await AsyncStorage.getItem('UserName')
    if( value !== null) {
     
        setUsername(value);


    }else{
      Alert.alert("ユーザーネームをセーブしてください")
  
    }
  }
  
 
  useEffect(() => {
    getUsername();
  })

  return (
        <Tab.Navigator 
                initialRouteName="Home"
                tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                
                tabStyle: {
                    // backgroundColor: 'lightgreen'
                    
                },
                labelStyle: {
                    fontSize: 23
                }
                }}
                
            >
                
                <Tab.Screen 
                options={{
                  title: 'マイページ'
                }}
                name="Home" component={createHomeStack}          
                />
                <Tab.Screen 
                    name="Yomiage" component={createYomiageStack}
                    options={{
                      title: '読み上げ'
                    }}
                />
                <Tab.Screen 
                    name="Setting" component={createSettingStack}
                    options={{
                      title: '設定'
                    }}
                />
            </Tab.Navigator>

    // <NavigationContainer>
    //   {/* <Stack.Navigator 
    //     initialRouteName="Home"
    //   >
    //     <Stack.Screen 
    //       name ="Home" component={Home}
    //       // options={{
    //       //   title='Home'
    //       // }} 
    //     />

    //     <Stack.Screen name="Start" component={Start} />
    //   </Stack.Navigator> */}
    // </NavigationContainer>
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
