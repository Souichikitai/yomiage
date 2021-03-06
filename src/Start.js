import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';

import {useDispatch, useSelector} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Start() {

const usernameState = useSelector((state) => state.usernameState);

const [username, setUsername] = useState("");
const [refresh, setRefresh] = useState("");
const [userstate, setUserstate] = useState(GLOBAL.userstate);

const dispatch = useDispatch();
const navigation = useNavigation()

forceRemount = async() => {

    try{
        const value = await AsyncStorage.getItem('UserName')
        if( value !== null) {
         
            if(username !== ""){
                dispatch({type:"CHANGE_USER_STATE_TRUE"})
            }else{
                Alert.alert("ユーザーネームを入れてください");
            }
    
        }else{
          Alert.alert("ユーザーネームをセーブしてください")
      
        }
    }
catch{
    Alert.alert("エラー")
}
   
}


// const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('UserName')
//       if( value !== null) {
       
//         setusertrue();
//         console.log(usernameState);

//       }else{
//         setUserstate(false)
    
//       }
//     } catch(e) {
    
//     }
//   }


const storeData = async () => {
    if(username==""){
        Alert.alert("Input is Null")
    }else{
        try{
            await AsyncStorage.setItem('UserName', username)
            console.log("Successfully stored")
            Alert.alert("Successfully stored")
            // navigation.push('Main')
            
            
            // forceRemount();
            // console.log("kok:   " + GLOBAL.userstate)
            
        }catch(e){
            console.log(e)
        }
    }

}

    return(

        <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerdesign}
        
        >就活面接　読み上げ</Text>

        </View>

        {usernameState == false ? (
                <View style={styles.flex2}>
                    <View style={styles.image}>
                    <Image source={require('../image/0095.png') } style={{width: 220, height: 310, marginLeft: 100}}/>

                    </View>
                {/* <Text style={{
                            marginTop: 30,
                            textAlign: 'center',
                            fontSize: 20
                        }}
                        
                        >
                            このアプリをダウンロードしていただきまして 誠にありがとうございます
                        </Text> */}
                        <Text style={{
                            marginTop: 30,
                            textAlign: 'center',
                            fontSize:20,
                        }}>
                            まず初めにユーザーネームを入れてください
                        </Text>
                        <TextInput 
                            style={{
                                marginTop: 40,
                                marginLeft: 20,
                                marginRight: 20,
                                marginBottom: 20,
                                padding:15,
                                fontSize: 25,
                                borderRadius: 20,
                                textAlign: 'center'
                            }}
                            backgroundColor='lavender'
                            onChangeText={text => setUsername(text)} 
                            placeholder="名前を入れてください"
                            
                        />

                        <TouchableOpacity style={styles.hozon} onPress ={storeData}>
                            <Text style={{color: 'lavender', fontSize: 20}}>保存</Text>
                        </TouchableOpacity>


                </View>
        ):(<View></View>)}


        <View style={styles.flex3}>

        <TouchableOpacity style={styles.button}
            onPress={forceRemount}
        >
            <Text style={{
                fontSize: 30,
                shadowColor: 'black',
                textShadowColor: 'white',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                borderRadius: 20,
                
            }}>
                始める
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tukaikata}>
            <Text style={{
                color: 'lavender',
                fontSize: 20
            }}>
                使い方
            </Text>
        </TouchableOpacity>

        </View>



    </SafeAreaView>





    );
}


  const styles = StyleSheet.create({
    container: {
      flex: 3,
      fontSize: 40,
    //   marginTop: 20,
      backgroundColor: 'tomato',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    },
    button: {
        // fontSize:,
        alignItems: 'center',
        // justifyContent: 'center',
        padding: 10,
        // width:100,
        // height: 100,
        fontSize: 60,
        marginBottom: 10,
        backgroundColor: 'lavender',
        shadowColor: 'lightblue',
        shadowOffset: {width: -1, height: 1},
        shadowRadius:10,
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 30
        
    },
    tukaikata: {
        paddingRight: 40,
        alignItems: 'flex-end',
        color:'lightblue',
        marginTop: 20
        
    },
    headerdesign: {
                fontSize:42,
                marginTop:20,
                marginBottom: 20,
                
                margin:10,
                fontWeight: '500',
                
    },
    header: {
        backgroundColor: 'tomato',
        fontWeight: 'bold',
        alignItems: 'center'
    },
    hozon: {
        alignItems: 'center',
    },
    flex3: {
        // flex: 1,
        // justifyContent: 'flex-end'
    },
    flex2: {
        flex: 1,
        // justifyContent: 'center',
        // alignContent: 'center'
    },
    image: {
        alignContent: 'center',
        alignContent: 'center'
    }
  });