import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Mypage from './Mypage';
import CusttomQues from './CusttomQues';
import Myquestion from './Myquestion';

const Stack = createStackNavigator();


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


// useEffect(()=>{
//     getUsername();
// }, []);
    
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
                        headerTintColor: 'lightgrey',
                        
                      }}
            />
            <Stack.Screen 
                name="CusttomQues" component={CusttomQues} options={{headerTintColor: 'lightgrey',title: "質問編集"}}
            />
            <Stack.Screen
                options={{title: '質問リスト', headerTintColor: 'lightgrey',}}
             name="Myquestion" component={Myquestion} />
        </Stack.Navigator>
    );
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'gainsboro',
//     //   alignItems: 'center',
//     //   justifyContent: 'center',
//     },
//     namae: {
//         flex: 0.04,
//         fontSize: 20,
//         paddingTop: 10,
//         paddingLeft: 10,
//         color: 'tomato',
//         alignItems: 'flex-end',
//         // backgroundColor: 'lightblue'
//     },
//     button1: {
//         flex: 0.2,
//         // justifyContent: '',
//         // backgroundColor: 'lightblue',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         padding: 10,
        
//     }
//   });