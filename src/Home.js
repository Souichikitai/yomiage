import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Mypage from './MyPage/Mypage';
import CusttomQues from './MyPage/CusttomQues';
import Myquestion from './MyPage/Myquestion';
import CompanyNavigator from './MyPage/CompanyNavigator';

const Stack = createStackNavigator();



const createNavigatorStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: 'tomato'
      }
    }}
    headerMode='none'
  >
    <Stack.Screen 
      name="CompanyNavigator" component={CompanyNavigator}
      options={{
        title: 'マイページ'
      }}
    />
  </Stack.Navigator>

)

export default function Home({navigation}) {


    
// const dispatch = useDispatch();

// const deleteuserinfo = () => {
//     dispatch({type: "CHANGE_USER_STATE_FALSE"})
// }

// const [username, setUsername] = useState("");


// const getUsername = async() =>{

//         const value = await AsyncStorage.getItem('UserName')
//         if( value !== null) {
         
//             setUsername(value);

    
//         }else{
//           Alert.alert("ユーザーネームを取得できませんでした")
      
//         }
    
// }

    
    return(

        <Stack.Navigator 
            initialRouteName="Mypage"
            // headerMode='none'
            screenOptions={{
                headerStyle: {
                  backgroundColor: 'tomato'
                }
              }}
        >
            <Stack.Screen name ="Mypage" component={Mypage}
                      options={{
                        title: 'マイページ',
                        headerTintColor: 'white',
                        
                      }}
            />
            <Stack.Screen 
                name="CusttomQues" component={CusttomQues} options={{headerTintColor: 'white',title: "質問編集"}}
            />
            <Stack.Screen
                options={{title: '質問リスト', headerTintColor: 'white',}}
             name="Myquestion" component={Myquestion} />

             
            <Stack.Screen
                options={{title: '企業別履歴', headerTintColor: 'white',}}
             name="CompanyNavigator" component={createNavigatorStack} />



        </Stack.Navigator>
    );
}
