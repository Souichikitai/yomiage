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
    const [selected_kind, setSelectedKind] = useState("");
    const [selected_sent, setSelectedsent] = useState("");


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
                // setCustombutton(false);
                // setAllbutton(true);
            }
            );
        },
        (t, error) => { console.log("db error load sentences"); console.log(error) },
        (_t, _success) => { console.log("loaded sentences")}
        );
    }

    const remove_item=(dsent)=>{

        
        
        console.log(dsent);

        db.transaction(
            tx => {
                tx.executeSql(
                "delete from sentences where sentence = ?",
                [dsent],
                (_, { rows}) => {
                    console.log(" Result is:  " + JSON.stringify(rows._array));
                    // if(JSON.stringify(rows._array) == "[]"){
                    //     Alert.alert('データベースが空です');
                    // }
                    setData_array(rows._array);
                    // setCustombutton(false);
                    // setAllbutton(true);
                }
                );
            },
            (t, error) => { console.log("db error load sentences"); console.log(error) },
            (_t, _success) => { console.log("loaded sentences")}
            );

            getallDatafrom();
    }


    const Flat_list = ({ kind, sentence }) => (
        <View style={styles.allitem}>
            <TouchableOpacity onPress={()=> {
            //    console.log(kind +" " + sentence); 
                console.log(kind);
                console.log(sentence);
 

            }}>
            {/* <View style={styles.border}>
                <Text style={{fontSize: 2}}>fe</Text>
            </View> */}
            <Text style={styles.flat_list_value_style}>種類:  {kind}</Text>
            <Text style={styles.flat_list_value_style}>文章:  {sentence}</Text>

            </TouchableOpacity>
            {/* <Button title="delete" /> */}

            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <TouchableOpacity  style={{
                    alignItems:'flex-end',
                    marginRight:5,
                    justifyContent: 'flex-end'
                }}
                onPress={()=>{
                    
                    // Alert.alert('削除しますか？', {canc});

                    Alert.alert(
                        "削除しますか？",
                        "",
                        [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => remove_item(sentence)}
                        ],
                        { cancelable: false }
                    );

                    setSelectedKind(kind);
                    setSelectedsent(sentence);
                    console.log("test" + selected_sent);
                    
                    
                }}>


                    {/* <View > */}
                    <Text style={{color:'dimgray', paddingRight: 5, paddingBottom: 2}}>削除</Text>
                    {/* </View> */}
                    
                </TouchableOpacity>
            </View>

        </View>
      );
    
    // const getpersonaldata = () =>{
    //     db.transaction(
    //         tx => {
    //             tx.executeSql(
    //             "select * from sentences where kind = '自己分析'",
    //             [],
    //             // (_, { rows: { _array } }) => {
    //             //     var items = JSON.stringify(_array)
    //             //     setSentecesfrom(items)
    //             //     // setSentecesfrom(_array)
    //             //     console.log(" sentences")
    //             // }
        
    //             (_, { rows}) => {
    //                 console.log(" Result is:  " + JSON.stringify(rows._array));
    //                 if(JSON.stringify(rows._array) == "[]"){
    //                     Alert.alert('データベースが空です');
    //                 }
    //                 setData_array(rows._array);
    //                 // setCustombutton(false);
    //                 // setAllbutton(true);
    //             }
    //             );
    //         },
    //         (t, error) => { console.log("db error load sentences"); console.log(error) },
    //         (_t, _success) => { console.log("loaded sentences")}
    //         );
    // }

    
// const dispatch = useDispatch();

// const deleteuserinfo = () => {
//     dispatch({type: "CHANGE_USER_STATE_FALSE"})
// }

// const [username, setUsername] = useState("");


useEffect(()=>{
    getallDatafrom();
}, []);
    
    return(
    <SafeAreaView style={styles.container}>
        {/* <ScrollView > */}
            
            <View style={styles.button1}>

            </View>



        <FlatList data={Data_array} renderItem={renderItem} keyExtractor={item => JSON.stringify(item.id)}/>
            
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
        // padding: 10,
        // marginBottom: 40
        
    },
    border: {
        flex:0.004,
        
        backgroundColor: 'grey',

    },
    allitem:{
        flex: 0.1,
        // backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'flex-end',
        shadowColor: "black",
        shadowOffset: {
        width: 2,
        height: 2,
        },
        shadowRadius:2,
        shadowOpacity: 0.5,
        marginBottom: 2.5,
        marginTop: 2.5,
        paddingTop: 10,
        paddingLeft: 10,
        fontSize: 17,
        backgroundColor:'ghostwhite',
        borderRadius: 20
    },
    flat_list_value_style: {
        color: 'darkslategrey',
        fontSize: 18
    }

  });