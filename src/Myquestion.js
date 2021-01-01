{/* <View style={styles.button2}>

<TouchableOpacity style={{borderRadius:20, paddingTop: 52, padding:15 , marginLeft: 10, height: 125, backgroundColor: 'lightblue', fontSize: 20}} 
    onPress={getDatafrom}
>
    <Text style={{fontSize: 30, fontWeight: "400"}}>質問をみる</Text>
</TouchableOpacity>
</View> */}
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('db');

// import Mypage from './Mypage';


// const Stack = createStackNavigator();

// const all_flat_list = () => {
//     <FlatList>

//     </FlatList>
// }

const Flat_list = ({ kind, sentence }) => (
    <View style={styles.allitem}>
        <View style={styles.border}>
            <Text style={{fontSize: 2}}>fe</Text>
        </View>
        <Text style={styles.flat_list_value_style}>種類:  {kind}</Text>
        <Text style={styles.flat_list_value_style}>文章:  {sentence}</Text>
    </View>
  );

  const No_value_view = () => (
    <View>
        <Text>Press button</Text>
    </View>
  );

//   const all_flat_list = ()=>{
//     console.log("================================");
//     console.log(all_button);
//     // if(all_button==true){
        
//         // <FlatList data={Data_array} renderItem={renderItem} keyExtractor={item.id}/>
        
//     // }

// }


export default function Myquestion({navigation}) {

    const renderItem = ({item}) => <Flat_list  kind={item.kind} sentence={item.sentence}/>;

    // const [new_kind, setNewKind] = useState("");
    // const [new_Bunn, setNewBunn] = useState("");

    const [Data_array, setData_array] = useState([]);
    const [all_button, setAllbutton] = useState(false);
    const [custom_button, setCustombutton] = useState(false);



    const getallDatafrom =() => {

        db.transaction(
        tx => {
            tx.executeSql(
            'select * from sentences',
            [],
            // (_, { rows: { _array } }) => {
            //     var items = JSON.stringify(_array)
            //     setSentecesfrom(items)
            //     // setSentecesfrom(_array)
            //     console.log(" sentences")
            // }
    
            (_, { rows}) => {
                console.log(" Result is:  " + JSON.stringify(rows._array));
                if(JSON.stringify(rows._array) == "[]"){
                    Alert.alert('データベースが空です');
                }
                setData_array(rows._array);
                setCustombutton(false);
                setAllbutton(true);
            }
            );
        },
        (t, error) => { console.log("db error load sentences"); console.log(error) },
        (_t, _success) => { console.log("loaded sentences")}
        );
    }
    
    
    // function insertSentence(){

    //     console.log("insert is called");
    //     var kind = new_kind;
    //     var sentence = new_Bunn;

    //     if(new_kind == "" || new_Bunn == ""){
    //         Alert.alert("新しく追加するものを入れてください");
    //     }else{
    //         console.log('insert sentence, kind:' + kind + "" + sentence)
      
    //         db.transaction(tx => {
    //           tx.executeSql(
    //             "INSERT INTO sentences" +
        
    //             "(kind, sentence)" + 
        
    //             " VALUES (?, ?);" ,
    //             [kind, sentence]
    //           );
    //         },
    //         () => {console.log('fail')},
    //         () => {console.log('success1222')},
    //         );
    //     }


    //   }
    
// const dispatch = useDispatch();

// const deleteuserinfo = () => {
//     dispatch({type: "CHANGE_USER_STATE_FALSE"})
// }

// const [username, setUsername] = useState("");


// useEffect(()=>{
//     getUsername();
// }, []);
    
    return(
    <SafeAreaView style={styles.container}>
        {/* <ScrollView > */}
            
            <View style={styles.button1}>
                <TouchableOpacity style={{borderRadius:10 , padding: 15 ,marginRight: 5, height: 50, backgroundColor: 'lightgrey', fontSize: 20}}
                    onPress={getallDatafrom}
                >
                    <Text style={{fontSize: 18, fontWeight: "500", color: 'tomato'}}>全質問を表示する</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderRadius:10, padding:15 , marginLeft: 5, height: 50, backgroundColor: 'lightgrey', fontSize: 20, }}>
                    <Text style={{fontSize: 17, fontWeight: "500", color: 'tomato'}}>カスタム質問を表示する</Text>
                </TouchableOpacity>
            </View>

            {/* {all_button == true && custom_button ==false ? (): ()} */}
            {/* {all_button == true ? (<FlatList data={Data_array} renderItem={renderItem} keyExtractor={item => item.id}/>)
                : (null)} */}
            {(() => {
            if (all_button == true && custom_button == false) {
                return(<FlatList data={Data_array} renderItem={renderItem} keyExtractor={item => item.id}/>);
            } else if(custom_button == true && all_button== false){

            } else if(all_button == false && custom_button == false){
                return(null);
            }
        })()}
            
        {/* </ScrollView> */}
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
    button1: {
        flex: 0.07,
        // justifyContent: '',
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 40
    },
    border: {
        flex:0.008,
        // fontSize: 20,
        // marginTop: 7,
        // paddingLeft: 10,
        // color: 'tomato',
        // alignItems: 'flex-end',
        //   alignItems: 'center',
        backgroundColor: 'grey',
        // borderBottomColor: 'black',
    },
    allitem:{
        flex: 0.1,
        backgroundColor: 'white',
        // marginTop: 30
        justifyContent: 'flex-end',
    },
    flat_list_value_style: {
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 15
    }
    // border1 :{
    //     flex: 0.002,
    //     backgroundColor: 'black'
    // },
    // sentencess: {
    //     flex: 0.2,
    //     fontSize: 20,
    //     // marginTop: 10,
    //     // paddingLeft: 10,
    //     color: 'tomato',
    //     // alignItems: 'flex-end',
    //     //   alignItems: 'center',
    //     backgroundColor: 'lightgrey'
        
    // },
    // submit_button: {
    //     padding: 5,
    //     flex: 0.18,
    //     alignItems: 'center',
    //     // backgroundColor: 'lightblue'
    // },
    // submit_button2: {
    //     padding: 5,
    //     flex: 0.4,
    //     alignItems: 'center',
    //     justifyContent: 'flex-end'
    // }
  });