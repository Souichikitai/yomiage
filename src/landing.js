import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';

import {useDispatch, useSelector} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Start() {

// const [username, setUsername] = useState("");
// const [refresh, setRefresh] = useState("");
// const [userstate, setUserstate] = useState(GLOBAL.userstate);

const dispatch = useDispatch();
const navigation = useNavigation()

const usernameState = useSelector((state) => state.usernameState);
const userisPressing = useSelector((state) => state.userisPressing);

const setuserpresstru = () => {
    console.log(usernameState);
    dispatch({type: "USER_PRESSED_TRUE"});
}

// forceRemount = () => {
//    dispatch({type:"CHANGE_USER_STATE_TRUE"})
// }


// const storeData = async () => {
//     if(username==""){
//         Alert.alert("Input is Null")
//     }else{
//         try{
//             await AsyncStorage.setItem('UserName', username)
//             console.log("Successfully stored")
//             Alert.alert("Successfully stored")
//             // navigation.push('Main')
            
            
//             forceRemount();
//             // console.log("kok:   " + GLOBAL.userstate)
            
//         }catch(e){
//             console.log(e)
//         }
//     }

// }

// const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('UserName')
//       if( value !== null) {
       
//         setusertrue();

//       }else{
//         setUserstate(false)
    
//       }
//     } catch(e) {
    
//     }
//   }

const hajimeruOnpress = () => {
    if(usernameState !== false){
        // navigation.navigate("Authscreen");
        setuserpresstru();
        // console.log(userisPressing);
    }else{
        // navigation.navigate("Start");
        // console.log("here1");
    }
}

// useEffect(() => {
//     // console.log(usernameState)
//     getData()
    
//   },[]);

    return(

        <SafeAreaView style={styles.container}>
            <Text
                style={{
                    fontSize:46,
                    marginTop:30,
                    margin:10
                }}
            >就活面接　読み上げアプリ</Text>

                {/* <Button style={{              
                    }} 

                    color="lightgrey"
                    
                    title = "始める"
                    
                /> */}
                <TouchableOpacity style={styles.button} onPress={hajimeruOnpress}>
                    <Text style={{
                        fontSize: 30
                    }}>
                        始める
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tukaikata}>
                    <Text style={{
                        color: 'blue',
                        fontSize: 20
                    }}>
                        使い方
                    </Text>
                </TouchableOpacity>


        </SafeAreaView>

        // <View style={styles.container}>

        //     <Te
        
        // {/* <Text>
        //     このアプリをダウンロードしてくれてありがとうございます
        // </Text>
        // <Text>
        //     まず初めにユーザーネームを入れてください
        // </Text>
        // <TextInput 
        //     style={{
        //         marginTop: 30
                
        //     }}
        //     backgroundColor='white'
        //     onChangeText={text => setUsername(text)} 
        //     placeholder="     Type your username      "
        // />
        // <Button 
        // style={{
        //     marginTop: 30
        // }}
        // title="Save" onPress={storeData}/> */}
        // {/* <Button title="Home.js" onPress={()=>navigation.navigate('Home')} /> */}
        // </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 40,
    //   marginTop: 20,
      backgroundColor: 'tomato',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    button: {
        // fontSize:,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        // width:100,
        // height: 100,
        fontSize: 60,
        margin: 60,
        backgroundColor: 'lightgrey'
    },
    tukaikata: {
        paddingRight: 40,
        alignItems: 'flex-end',
        color:'lightblue',
        
    }
  });