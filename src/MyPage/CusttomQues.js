import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('db');

// import Mypage from './Mypage';


// const Stack = createStackNavigator();




export default function CusttomQues() {

    const [new_kind, setNewKind] = useState("");
    const [new_Bunn, setNewBunn] = useState("");
    const [adding_kind, setAddingKind] = useState("");
    const [adding_sentences, setAddingSentence] = useState("");
    const [success_register, setSuccess_Register] = useState(false);
    
    function insertSentence(){

        console.log("insert is called");
        var kind = new_kind;
        var sentence = new_Bunn;

        if(new_kind == "" || new_Bunn == ""){
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
            () => {console.log('success1222'), setSuccess_Register(true)},
            );
        }


      }

      function deleteAll(){
        console.log("Delete all")
      
        db.transaction(tx => {
          tx.executeSql(
            "delete from sentences;"
          );
        },
        () => {console.log('fail')},
        () => {console.log('success')},
        );
    }

    function change_kind_personal(){
        setNewKind("自己分析");
    }

    function change_kind_company(){
        setNewKind("企業分析");
    }

    function change_kind_future(){
        setNewKind("未来分析");
    }

    function change_kind_others(){
        setNewKind("その他");
    }
    

const Show_user_typed_value = () => (
    <View style = {styles.hidden_value}>
        <Text style = {styles.hidden_value_text}>種類:  {new_kind}</Text>
        <Text style = {styles.hidden_value_text}>文章:  {new_Bunn}</Text>
        <Text style = {styles.hidden_value_text1}>が追加されました</Text>
    </View>
)
    
    return(

        <SafeAreaView style={styles.container}>
            <View style={styles.kinds}>
                <Text style={{
                    fontSize: 30,
                    paddingTop: 20,
                    marginBottom: 10,
                    marginLeft: 10,
                }}>+ 新しく種類を追加する</Text>

                <View style = {styles.kindlist}>
                <TouchableOpacity onPress={change_kind_personal}>
                    <Text style={styles.kindeachlist}>
                        自己分析
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={change_kind_company}>
                    <Text style={styles.kindeachlist}>
                        企業分析
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={change_kind_future}>
                    <Text style={styles.kindeachlist}>
                        未来分析
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={change_kind_others}>
                    <Text style={styles.kindeachlist}>
                        その他
                    </Text>
                </TouchableOpacity>


                </View>
            </View>
            <View style={styles.border1}>
                    <Text>hello</Text>
            </View>
            <View style={styles.sentencess}>
                <Text style={{
                    fontSize: 30,
                    paddingTop: 20,
                    marginBottom: 10,
                    marginLeft: 10
                }}>+ 新しく文章を追加する</Text>
                <TextInput
                    style={{
                        backgroundColor: 'white',
                        padding: 10,
                        margin: 10,
                        fontSize: 28,
                    }}
                    placeholder="文章"
                    placeholderTextColor="grey"
                    onChangeText={text => setNewBunn(text)}
                ></TextInput>
            </View>


            <View style={styles.expression}>
                <Text style={styles.expressiontext}>
                    種類 : {new_kind}
                </Text>
                <Text style={styles.expressiontext}>
                    文章 : {new_Bunn}
                </Text> 
            </View>


            <View style={styles.submit_button}>
                <TouchableOpacity style={{
                    backgroundColor: 'tomato',
                    padding: 27,
                    borderRadius: 30,
                    marginTop: 20
                }}
                onPress={insertSentence}
                >
                    <Text style={{
                        color: 'white'
                    }}>登録する</Text>
                </TouchableOpacity>
            </View>

            {success_register == true && <Show_user_typed_value/>}

            <View style={styles.submit_button2}>
                <TouchableOpacity style={{
                    backgroundColor: 'tomato',
                    padding: 23,
                    borderRadius: 30,
                }}
                onPress={deleteAll}
                >
                    <Text style={{
                        color: 'white'
                    }}>全て削除する</Text>
                </TouchableOpacity>
            </View>

            
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
    kinds: {
        flex: 0.2,
        fontSize: 20,
        // marginTop: 10,
        // paddingLeft: 10,
        color: 'tomato',
        // alignItems: 'flex-end',
        //   alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderBottomColor: 'black',
    },
    border1 :{
        flex: 0.002,
        backgroundColor: 'black'
    },
    sentencess: {
        flex: 0.2,
        fontSize: 20,
        // marginTop: 10,
        // paddingLeft: 10,
        color: 'tomato',
        // alignItems: 'flex-end',
        //   alignItems: 'center',
        backgroundColor: 'lightgrey'
        
    },
    submit_button: {
        // padding: 5,
        flex: 0.18,
        alignItems: 'center',
        // backgroundColor: 'lightblue'
    },
    submit_button2: {
        padding: 5,
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    hidden_value: {
        flex: 0.3,
        // justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
        // backgroundColor: 'red'
        // paddingTop: 10
    },
    hidden_value_text: {
        marginTop: 10,
        flex: 0.3,
        fontSize: 20,
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // backgroundColor: 'red'
        // paddingTop: 10
    },
    hidden_value_text1: {
        color: 'green'
    },
    kindlist:{
        // backgroundColor: 'lightgreen',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 10,
       
        
    },
    kindeachlist:{
        backgroundColor: 'white',
        fontSize: 25,
        padding: 4,
        margin: 5,
        borderRadius: 15
    },
    expression:{
        
        marginTop: 10,
        marginLeft: 10,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    expressiontext:{
        fontSize:20,
        margin:10
        // alignItems: 'center',
        
    }
  });