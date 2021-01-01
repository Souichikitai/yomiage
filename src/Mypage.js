import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('db');


export default function Mypage({navigation}) {
    
const dispatch = useDispatch();

// const deleteuserinfo = () => {
//     dispatch({type: "CHANGE_USER_STATE_FALSE"})
// }

const [username, setUsername] = useState("");
const [sentencesfrom, setSentecesfrom] = useState([]);


const getUsername = async() =>{

        const value = await AsyncStorage.getItem('UserName')
        if( value !== null) {
         
            setUsername(value);

    
        }else{
          Alert.alert("ユーザーネームを取得できませんでした")
      
        }
    
}

// function insertSentence(kind, sentence){
//     console.log('insert sentence, kind:' + kind + "" + sentence)
  
//     db.transaction(tx => {
//       tx.executeSql(
//         "INSERT INTO sentences" +

//         "(kind, sentence)" + 

//         " VALUES (?, ?);" ,
//         [kind, sentence]
//       );
//     },
//     () => {console.log('fail')},
//     () => {console.log('success1222')},
//     );
//   }

// function getDatafrom(){

//     db.transaction(
//     tx => {
//         tx.executeSql(
//         'select * from sentences',
//         [],
//         // (_, { rows: { _array } }) => {
//         //     var items = JSON.stringify(_array)
//         //     setSentecesfrom(items)
//         //     // setSentecesfrom(_array)
//         //     console.log(" sentences")
//         // }

//         (_, { rows}) => {
//             console.log(" Result is:  " + JSON.stringify(rows._array));
//             setSentecesfrom(rows._array);
//         }
//         );
//     },
//     (t, error) => { console.log("db error load sentences"); console.log(error) },
//     (_t, _success) => { console.log("loaded sentences")}
//     );
// }

// function deleteAll(){
//     console.log("Delete all")
  
//     db.transaction(tx => {
//       tx.executeSql(
//         "delete from sentences;"
//       );
//     },
//     () => {console.log('fail')},
//     () => {console.log('success')},
//     );
// }

// function checker(){

//     var kind = "Test";
//     var sentence = "Value";
//     console.log("Pressed")

//     db.transaction(tx => {
//         tx.executeSql(
//           "INSERT INTO sentences" +
  
//           "(kind, sentence)" + 
  
//           " VALUES (?, ?);" ,
//           [kind, sentence]
//         );
//       },
//       () => {console.log('fail')},
//       () => {console.log('success1222')},
//       );
// }

// const onpressCustomQuestion = (navigation) => {
//     navigation.navigate('CusttomQues');
// }

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

            <View style={styles.topbutton}>
                <TouchableOpacity style={{borderRadius:20 ,paddingTop: 46, padding:15, marginRight: 10, width: 180, height: 125, backgroundColor: 'tomato', fontSize: 20}} 
                    onPress={() => navigation.navigate('Myquestion')}
                >
                    <Text style={{fontSize: 35, fontWeight: "500", textAlign: 'center', color: 'lightgrey'}}>My 質問</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius:20, paddingTop: 52, width: 200,padding:15 , marginLeft: 10, height: 125, backgroundColor: 'tomato', fontSize: 20}}>
                    <Text style={{fontSize: 30, fontWeight: "500", textAlign: 'center', color: 'lightgrey'}}>企業別履歴</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button1}>
                <TouchableOpacity style={{borderRadius:20 ,paddingTop: 52, padding:15 , marginRight: 5, height: 125, backgroundColor: 'lightgrey', fontSize: 20}} onPress={()=>navigation.navigate('CusttomQues')}>
                    <Text style={{fontSize: 20, fontWeight: "300", color: 'tomato'}}>+ My質問を編集する</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius:20, paddingTop: 52, padding:15 , marginLeft: 5, height: 125, backgroundColor: 'lightgrey', fontSize: 20}}>
                    <Text style={{fontSize: 17, fontWeight: "300", color: 'tomato'}}>+ 企業履歴を編集する</Text>
                </TouchableOpacity>
            </View>




{/* 
            <Text style={{fontSize: 20, paddingBottom: 10}}>
                種類は: {sentencesfrom.map((sent) => (
                    <Text>{sent.kind}</Text>
                ))}
            </Text>
            <Text style={{fontSize: 20}}>
                文章は: {sentencesfrom.map((sent) => (
                    <Text key={sent.id}>{sent.sentence}</Text>
                ))}
            </Text> */}

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
        flex: 0.04,
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 10,
        color: 'tomato',
        alignItems: 'flex-end',
        // backgroundColor: 'lightblue'
    },
    topbutton: {
        flex: 0.2,
        flexDirection: 'row',
        padding: 10,
    },

    button1: {
        flex: 0.2,
        // justifyContent: '',
        // backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        
    },
    button2: {
        flex: 0.2,
        // justifyContent: '',
        // backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 1,
        marginTop: 10
    },
    button3: {
        flex: 0.4,
        justifyContent: 'flex-end'
    }
  });