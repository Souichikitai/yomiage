import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
import * as SQLite from "expo-sqlite";

import {useDispatch, useSelector} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';


const db = SQLite.openDatabase('db');

function checkiftableExsist(){
    console.log("Deleting table")
      
    db.transaction(tx => {
      tx.executeSql(
        "drop table companys;"
      );
    },
    () => {console.log('fail')},
    () => {console.log('successfully delete table******')},
    );
}

function insertSentence(kind, sentence){

    console.log("insert is called");
    // var kind = new_kind;
    // var sentence = new_Bunn;

    if(kind == "" || sentence == ""){
        Alert.alert("新しく追加するものを入れてください");
    }else{
        console.log('insert sentence, kind:' + kind + "" + sentence)
  
        db.transaction(tx => {
          tx.executeSql(
            "INSERT INTO sentences" +
    
            "(kind, sentence)" + 
    
            " VALUES (?, ?);" ,
            [kind, sentence]
          );
        },
        () => {console.log('fail')},
        () => {console.log('success1222')},
        );
    }


  }

//This function should only be executed when user initailly load this app
const insertInitialData = () => {
    insertSentence("自己分析(デフォルト)", "自己紹介してください");
    insertSentence("企業分析(デフォルト)", "志望動機をお願いします");
    insertSentence("未来分析(デフォルト)", "三年後に何をしたいですか？");
    insertSentence("自己分析(デフォルト)", "学生時代に頑張ったことはなんですか？");
    insertSentence("企業分析(デフォルト)", "なぜ弊社なんですか？");
    insertSentence("未来分析(デフォルト)", "短期目標、中期目標、長期目標を教えてください");
    insertSentence("自己分析(デフォルト)", "自己PRをお願いします");
    insertSentence("企業分析(デフォルト)", "弊社と同業他社の違いはなんですか？");
    insertSentence("未来分析(デフォルト)", "どのようなコンサル、営業になりたいですか？");
    insertSentence("自己分析(デフォルト)", "長所と短所をお聞きしてもよろしいですか？");
    console.log("Data has been stored succsessfully");
}

export default function Start() {


const usernameState = useSelector((state) => state.usernameState);

const [username, setUsername] = useState("");


const dispatch = useDispatch();
const navigation = useNavigation()

forceRemount = async() => {

    try{
        const value = await AsyncStorage.getItem('UserName')
        if( value !== null) {
         
            if(username !== ""){
                //reset table columns
                // checkiftableExsist();
                createdatabase();
                create_company_database();

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

const createdatabase = () => {
    // if(usernameState == false){
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists sentences (id integer primary key not null, kind text, sentence text);', // 実行したいSQL文
                null, // SQL文の引数
                () => {insertInitialData()}, // 成功時のコールバック関数
                () => {console.log('fail')} // 失敗時のコールバック関数
            );
            },
            () => {console.log('fail')}, // 失敗時のコールバック関数
            () => {console.log('')} // 成功時のコールバック関数
        )
    // }
}

const create_company_database = () => {

        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists companys (id integer primary key not null, company_name text, date text, round text, sentence text, note text);', // 実行したいSQL文
                null, // SQL文の引数
                () => {console.log('*Comanys database has successfully created *')}, // 成功時のコールバック関数
                () => {console.log('*Conpamy fail')} // 失敗時のコールバック関数
            );
            },
            () => {console.log('cfail')}, // 失敗時のコールバック関数
            () => {console.log('')} // 成功時のコールバック関数
        )
    
}



const storeData = async () => {
    if(username==""){
        Alert.alert("Input is Null")
    }else{
        try{
            await AsyncStorage.setItem('UserName', username)
            console.log("Successfully stored")
            Alert.alert("Successfully stored")
            
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