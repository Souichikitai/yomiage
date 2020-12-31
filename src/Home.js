import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home({navigation}) {
    
const dispatch = useDispatch();

// const deleteuserinfo = () => {
//     dispatch({type: "CHANGE_USER_STATE_FALSE"})
// }

const [username, setUsername] = useState("");


const getUsername = async() =>{

        const value = await AsyncStorage.getItem('UserName')
        if( value !== null) {
         
            setUsername(value);

    
        }else{
          Alert.alert("ユーザーネームを取得できませんでした")
      
        }
    
}

// const removeItemValue = async () => {
//     try{
//         await AsyncStorage.removeItem('UserName');
//         console.log('item removed');
//         deleteuserinfo();
//         return true;
//     }catch(e){
//         return false;
//     }
// }

useEffect(()=>{
    getUsername();
}, []);
    
    return(
        <SafeAreaView style={styles.container}>
            <View  style={styles.namae} >
                <Text style={{
                    color: 'tomato',
                    fontSize: 20
                }}>
                {username}さん
                </Text>
            </View>

            <View style={styles.button1}>
                <TouchableOpacity style={{borderRadius:20 ,paddingTop: 52, padding:15 , marginRight: 10, height: 125, backgroundColor: 'tomato', fontSize: 20}}>
                    <Text style={{fontSize: 15, fontWeight: "600"}}>+ カスタム質問追加する</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius:20, paddingTop: 52, padding:15 , marginLeft: 10, height: 125, backgroundColor: 'tomato', fontSize: 20}}>
                    <Text style={{fontSize: 15, fontWeight: "600"}}>+ 企業別履歴に追加する</Text>
                </TouchableOpacity>
            </View>
            <View>

            </View>

            {/* <Button title="Yomiage" onPress={()=>navigation.navigate('Yomiage')} /> */}
            {/* <Button title="remove storeage" onPress={removeItemValue}/> */}
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
    namae: {
        flex: 0.05,
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10,
        color: 'tomato',
        alignItems: 'flex-end',
        // backgroundColor: 'lightblue'
    },
    button1: {
        flex: 0.2,
        // justifyContent: '',
        // backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        
    }
  });