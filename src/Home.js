import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";

export default function Home({navigation}) {
    
const dispatch = useDispatch();

const deleteuserinfo = () => {
    dispatch({type: "CHANGE_USER_STATE_FALSE"})
}

const removeItemValue = async () => {
    try{
        await AsyncStorage.removeItem('UserName');
        console.log('item removed');
        deleteuserinfo();
        return true;
    }catch(e){
        return false;
    }
}
    
    return(
        <View style={styles.container}>
            <Text>
                Hello, this is home
            </Text>
            <Button title="Yomiage" onPress={()=>navigation.navigate('Yomiage')} />
            <Button title="remove storeage" onPress={removeItemValue}/>
        </View>

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