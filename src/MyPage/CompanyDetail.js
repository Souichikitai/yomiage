import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Pressable , FlatList, Alert, Modal, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from "expo-sqlite";
import RNPickerSelect from 'react-native-picker-select';

// import CompanyList from './CompanyList';
// import CompanyDetail from './CompanyDetail';

const Stack = createStackNavigator();
const db = SQLite.openDatabase('db');

export default function CompanyDetail({route, navigation}) {

    const situationRenderItem = ({item}) => <Flat_list_company id={item.id} round={item.round} c_name={item.c_name} />;
    const sentenceRenderItem = ({item}) => <Flat_list_sentence id={item.id} round={item.round} sentence={item.sentence} />;

    const {id} = route.params;
    const {round} = route.params;
    const {c_name} = route.params;
    const {date} = route.params;
    
    const [situationdata, setSituationData] = useState([]);
    const [sentencedata, setSentenceData] = useState([]);
    const [datedata, setDateData] = useState([]);
    const [empty_situation, setEmptysituation] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const getSituation = () => {

        db.transaction(
        tx => {
            tx.executeSql(
            'select distinct round from companys WHERE company_name = ?',
            [c_name],

            (_, { rows}) => {
                console.log(" Result is:  " + JSON.stringify(rows._array));
                if(JSON.stringify(rows._array) == "[]"){
                    Alert.alert('データベースが空です');
                    
                }
                setSituationData(rows._array);
            }
            );
        },
        (t, error) => { console.log("db error load sentences"); console.log(error) },
        (_t, _success) => { console.log("成功")}
        );
    }

    const getSentence = () => {

        db.transaction(
        tx => {
            tx.executeSql(
            'select id, round, sentence from companys WHERE round = ? and company_name = ? and sentence != ""',
            [round, c_name],

            (_, { rows}) => {
                console.log(" Result is:  " + JSON.stringify(rows._array));
                if(JSON.stringify(rows._array) == "[]"){
                    // Alert.alert('データベースが空です');
                    setEmptysituation(true);
                }
                setSentenceData(rows._array);
            }
            );
        },
        (t, error) => { console.log("db error load sentences"); console.log(error) },
        (_t, _success) => { console.log("成功")}
        );
    }

    const getDate = () => {

        db.transaction(
        tx => {
            tx.executeSql(
            'select id, date from companys WHERE round = ? and company_name = ? and sentence != ""',
            [round, c_name],

            (_, { rows}) => {
                console.log(" Result is:  " + JSON.stringify(rows._array));
                if(JSON.stringify(rows._array) == "[]"){
                    // Alert.alert('データベースが空です');
                    setEmptysituation(true);
                }
                setDateData(rows._array);
            }
            );
        },
        (t, error) => { console.log("db error load sentences"); console.log(error) },
        (_t, _success) => { console.log("成功")}
        );
    }

    // const getSentence_Flatlist = (_round) => {

    //     db.transaction(
    //     tx => {
    //         tx.executeSql(
    //         'select id, round, sentence from companys WHERE round = ? and company_name = ? and sentence != ""',
    //         [_round, c_name],

    //         (_, { rows}) => {
    //             console.log(" Result is:  " + JSON.stringify(rows._array));
    //             if(JSON.stringify(rows._array) == "[]"){
    //                 // Alert.alert('データベースが空です');
    //                 setEmptysituation(true);
    //             }
    //             setSentenceData(rows._array);
    //         }
    //         );
    //     },
    //     (t, error) => { console.log("db error load sentences"); console.log(error) },
    //     (_t, _success) => { console.log("成功")}
    //     );
    // }

    const Flat_list_company = ({id, round}) => (
        <View style={{margin: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center', borderRadius: 9}}>
            <TouchableOpacity onPress={()=>{console.log(id + "" + c_name + round + date)}}>
                <Text style={{fontSize: 18}}>⚫︎ {round} </Text>
                {/* <Text>{c_name}</Text> */}
            </TouchableOpacity>
        </View>
      );

    const Flat_list_sentence = ({id, round, sentence}) => (
    
    <View style={{margin: 1, backgroundColor: 'white', borderRadius: 9}}>
        <View style={{alignItems: 'flex-start'}}>
            <TouchableOpacity onPress={()=>{console.log(id + "" + c_name)}}>
                <Text style={{fontSize: 22, marginLeft: 1, paddingLeft: 6,  alignItems: 'flex-start'}}>○ {sentence}</Text>
                
            </TouchableOpacity>

        </View>

        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <TouchableOpacity >
                <Text style={{fontSize: 20, marginLeft: 1, paddingRight: 10, color: 'dimgrey'}}>削除</Text>
            </TouchableOpacity>
        </View>

    </View>
    );

    useEffect(()=>{
        getSituation();
        getSentence();
        getDate();
    }, []);

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.title}>
                <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', borderRadius: 10, color: 'white', flex: 0.2}}>
                <Pressable style={{borderRadius: 10}} onPress={() => {
                    navigation.navigate('CompanyList')
                }}>
                    <View style={{borderRadius: 10, color: 'white', backgroundColor: 'tomato' ,marginTop: 5 , marginLeft: 5, padding: 4
                    ,shadowColor: "black",
                    shadowOffset: {
                    width: 2,
                    height: 2,
                    },
                    shadowRadius:2,
                    shadowOpacity: 0.5,
                    }}
                    
                    >
                    <Text style={{alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'white',
                    shadowColor: "black",
                    shadowOffset: {
                    width: 2,
                    height: 2,
                    },
                    shadowRadius:2,
                    shadowOpacity: 0.4,
                    }}>＜ リストに戻る</Text>
                    </View>
                    
                </Pressable>

                </View>


                <View style={{alignItems: 'flex-end', justifyContent: 'flex-end',}}>
                        <Text style={{
                            fontSize: 35, fontStyle: 'italic',
                            shadowColor: "lightcyan",
                            shadowOffset: {
                            width: 2,
                            height: 2,
                            },
                            shadowRadius:2,
                            shadowOpacity: 2,
                            alignItems: 'flex-end', justifyContent: 'flex-end', 
                            marginRight: 5,
                            color: 'tomato'
                        }}
                        >
                            {c_name}
                        </Text>
                </View>




                <View style={{flex: 0.8,flexDirection: 'space-between', backgroundColor: 'grey', borderRadius: 10}}>
                    <View style={{marginLeft: 2.5, marginRight: 2.5,  borderRadius: 7, padding: 6, flex: 0.2, justifyContent: 'center'}}>
                        <Text style={{fontSize:22, color: 'white'}}>
                            {round}   ({date})
                        </Text>
                    </View>

                    <View style={{marginLeft: 2.5, marginRight: 2.5,  borderRadius: 7, flex:0.8, backgroundColor: 'lightgrey'}}>
                        <Text style={{fontSize: 20, padding:1}}>今までの面接状況</Text>
                        <FlatList
                                    data={situationdata}
                                    renderItem={situationRenderItem}
                                    keyExtractor={item => JSON.stringify(item.id)}
                                    // keyExtractor={(item, id) => id.toString()}
                                    // ItemSeparatorComponent={renderSeparator}
                        />
                    </View>
                </View>
                
            </View>

            {/* <View style={styles.body}>
                <Text>id: {JSON.stringify(id)}</Text>
                <Text>Company Name: {JSON.stringify(c_name)}</Text>
                <Text>{JSON.stringify(round)}</Text>
            </View> */}
            
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5, backgroundColor: 'grey', borderRadius: 10}}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: 'white'}}>聞かれた質問リスト</Text>
                    </View>
                        
                        <View style={{alignItems: 'flex-end', backgroundColor: "tomato",

                            alignItems: 'flex-end', justifyContent: 'flex-end', borderRadius: 8,
                            shadowColor: "black",
                            shadowOffset: {
                            width: 3,
                            height: 3,
                            },
                            shadowRadius:2,
                            shadowOpacity: 0.5,
                        }}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <View >
                                    <Text style={{fontSize: 22, color: 'white', padding: 3,
                                    shadowColor: "black",
                                    shadowOffset: {
                                    width: 2,
                                    height: 2,
                                    },
                                    shadowRadius:2,
                                    shadowOpacity: 0.4,
                    
                                    }}>＋追加</Text>
                                </View>
                                
                            </TouchableOpacity>
                            
                        </View>

                        {/* {modal} ------------------------------------------------------------------------------------------------------------------*/}
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Text style={styles.modalText}>聞かれた質問</Text>
                            <TextInput
                            style={{
                                fontSize: 20,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: '#789',
                                borderRadius: 4,
                                color: '#789',
                                marginBottom: 5,
                                // textAlign: 'center',
                                width: 300
                            }}
                            placeholder="例：　弊社を志望する理由は？"
                            placeholderTextColor="grey"
                            multiline={true}
                            blurOnSubmit={true}
                            // onChangeText={text => setNewCname(text)}
                        ></TextInput>

                        <Text style={styles.modalText}>自分の答え</Text>
                            <TextInput
                            style={{
                                // textAlignVertical: 'top',
                                fontSize: 20,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: '#789',
                                borderRadius: 4,
                                color: '#789',
                                marginBottom: 5,
                                // textAlign: 'center',
                                width: 300,
                                height: 240,
                                
                            }}
                            placeholder="〜からです。"
                            placeholderTextColor="grey"
                            multiline={true}
                            blurOnSubmit={true}
                            // onChangeText={text => setNewDate(text)}
                        ></TextInput>

                            <Pressable 
                            style={[styles.button1, styles.buttonClose]}
                            // onPress={insertCompanySentence}
                            >
                                 <Text style={styles.textStyle}>保存</Text>
                            </Pressable>

                        
                            <Pressable
                            style={[styles.button, styles.buttonClose2]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                                 <Text style={styles.textStyle}>閉じる</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                    {/* {------------------------------------------------------------------------------------------------------------------} */}
                        
                </View>


                <View style={{marginLeft: 2.5, marginRight: 2.5, flex: 0.65,flexDirection: 'column'}}>
                    

                    {empty_situation == true ? <View><Text>empty</Text></View>: (<FlatList
                                data={sentencedata}
                                renderItem={sentenceRenderItem}
                                keyExtractor={item => JSON.stringify(item.id)}
                                // ItemSeparatorComponent={renderSeparator}
                    />)}

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
    title: {
        flex: 0.35,        
        // alignItems: 'flex-start',
        // justifyContent: 'center',
        // backgroundColor: 'lightpink',
        
    },
    body: {
        flex: 0.65,
        margin: 3,
        backgroundColor: 'grey'
    },
    back:{
        margin: 8,
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#789',
        borderRadius: 4,
        color: '#789',
        marginBottom: 5,
        textAlign: 'center'
        // paddingRight: 30, // to ensure the text is never behind the icon
        // width: 300,
        // marginLeft: 30
      },
    listbutton: {
        flex: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
        // backgroundColor: 'pink'
    },
    plusbutton: {
        // alignItems: 'flex-end',
        // margin: 8,
        // backgroundColor: 'tomato',
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        // flexDirection: 'row',
        alignItems: 'flex-end'
        
    },
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "flex-end",
        marginTop: 8,
        marginRight: 5
      },
      modalView: {
        // alignItems: "center",
        justifyContent: 'center',
        marginRight: 20,
        marginTop: 90,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button1: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
        marginTop:30,
        paddingLeft: 30,
        paddingRight: 30
      },
      button: {
        borderRadius: 20,
        padding: 10,

        elevation: 2,
        // marginBottom: 10
      },
      buttonOpen: {
        backgroundColor: "tomato",
        shadowColor: "grey",
        shadowOffset: {
        width: 2,
        height: 2,
        },
        shadowRadius:2,
        shadowOpacity: 2,
        
      },
      buttonClose: {
        backgroundColor: "tomato",
        // fontSize: 
        fontWeight: "bold",

      },

      buttonClose2:{
        backgroundColor: "grey",
        color: 'black',
        // fontSize: 
        fontWeight: "bold"
      },

      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        // marginTop: 10,
        fontSize:20,
        shadowColor: "black",
        shadowOffset: {
        width: 2,
        height: 2,
        },
        shadowRadius:2,
        shadowOpacity: 0.5,
        
      },


      modalText: {
        marginBottom: 8,
        textAlign: "center",
        fontSize: 25,
        marginTop: 10
      },

  });