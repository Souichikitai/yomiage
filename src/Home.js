import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";

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
          Alert.alert("ユーザーネームをセーブしてください")
      
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

            <Button title="Yomiage" onPress={()=>navigation.navigate('Yomiage')} />
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
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10,
        color: 'tomato',
        alignItems: 'flex-end',
    }
  });