import React from 'react';
import { StyleSheet, Text, View, Button , SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useDispatch} from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting({navigation}) {

    const dispatch = useDispatch();

    const deleteuserinfo = () => {
        dispatch({type: "CHANGE_USER_STATE_FALSE"})
    }

    const removeItemValue = async () => {
        try{
            await AsyncStorage.removeItem('UserName');
            console.log('item removed');
            deleteuserinfo();
            //reset table columns
            // deleteTable();
            return true;
        }catch(e){
            return false;
        }
    }

    function deleteTable(){
        console.log("Delete table")
      
        db.transaction(tx => {
          tx.executeSql(
            "drop table companys;"
          );
        },
        () => {console.log('fail')},
        () => {console.log('successfully delete table******')},
        );

        // getallCDatafrom();
    }

    return(
        <SafeAreaView style={styles.container}>
        <Text style={{
            fontSize: 30,
            padding: 20
        }}>
            設定ページ
        </Text>

        <View style={styles.setting1}>
            <TouchableOpacity onPress={removeItemValue}>
                <Text>* ユーザーネームを削除する</Text>
            </TouchableOpacity>
            
        </View>
        {/* <View style={styles.setting1}>
            <TouchableOpacity onPress={removeItemValue}>
                <Text>* テーブルを削除する</Text>
            </TouchableOpacity>
            
        </View> */}



        {/* <Button title="Home.js" onPress={()=>navigation.navigate('Home')} /> */}
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gainsboro',

    },
    setting1: {
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10
    }
  });