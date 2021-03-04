import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Modal , Pressable, TextInput, List, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from "expo-sqlite";
import RNPickerSelect from 'react-native-picker-select';

// const Stack = createStackNavigator();

const db = SQLite.openDatabase('db');

const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };


export default function CompanyList({navigation}) {

    const companyRenderItem = ({item}) => <Flat_list_company id={item.id}  c_name={item.company_name} date={item.date} round={item.round}/>;

    const [modalVisible, setModalVisible] = useState(false);
    const [new_cname, setNewCname] = useState("");
    const [new_date, setNewDate] = useState("");
    const [new_round, setNewRound] = useState("");
    const [new_bunn, setNewBunn] = useState("");
    const [new_note, setNewNote] = useState("");
    const [CData_array, setCData_array] = useState([]);

    const getallCDatafrom =() => {

        db.transaction(
        tx => {
            tx.executeSql(
            'select distinct company_name, date, round from companys',
            [],
    
            (_, { rows}) => {
                console.log(" Result is:  " + JSON.stringify(rows._array));
                if(JSON.stringify(rows._array) == "[]"){
                    // Alert.alert('データベースが空です');
                }
                setCData_array(rows._array);

            }
            );
        },
        (t, error) => { console.log("db error load sentences"); console.log(error) },
        (_t, _success) => { console.log("loaded sentences")}
        );
    }

    function insertCompanySentence(){

        console.log("cinsert is called");

        var company_name = new_cname;
        var date = new_date;
        var round = new_round;
        // var sentence = new_bunn;
        var sentence = "趣味は?";
        var note = new_note;

        if(new_cname == "" || new_date == "" || new_round == ""){
            Alert.alert("新しく追加するものを入れてください");
        }else{
            console.log('insert company details: ' + company_name + "," + date + "," + round + "sentence: " + sentence + "note: " + note )
    
            db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO companys" +
        
                "(company_name, date, round, sentence, note)" + 
        
                " VALUES (?, ?, ? ,? ,?);" ,
                [company_name, date, round, sentence, note]
            );
            },
            () => {console.log('企業別履歴　保存失敗')},
            () => {console.log('企業別履歴　保存成功')},
            );
        }

        getallCDatafrom();
    }

    function deleteCAll(){
        console.log("Delete all")
      
        db.transaction(tx => {
          tx.executeSql(
            "delete from companys;"
          );
        },
        () => {console.log('fail')},
        () => {console.log('success')},
        );

        getallCDatafrom();
    }

    function deleteSpecificItem(c_name, round){
        console.log(c_name + " " + round + "を削除します");

        db.transaction(tx => {
            tx.executeSql(
              "DELETE FROM companys WHERE company_name = ? AND round = ? ;"
              ,[c_name, round]
            );
          },
          () => {console.log('fail')},
          () => {console.log('success')},
          );

          getallCDatafrom();
    }

    const Flat_list_company = ({ id, c_name, date, round, note}) => (
        <View style={styles.allitem}>
            <TouchableOpacity style={styles.koko} onPress={()=> {
                console.log(id + c_name + "" + date +""+ round), 
                navigation.navigate('CompanyDetail', {
                    id: id, 
                    c_name: c_name,
                    date: date,
                    round: round
                    
                  });
                // navigation.navigate('CompanyDetail')
                }}>
            
                {/* <Text style={styles.flat_list_value_style}>{id}</Text> */}
                <Text style={styles.flat_list_value_style}>企業名:  {c_name}</Text>
                <Text style={styles.flat_list_value_style}>日付:  {date}</Text>
                <Text style={styles.flat_list_value_style}>面接状況:  {round}</Text>
                {/* <Text style={styles.flat_list_value_style}>メモ:  {note}</Text> */}

            </TouchableOpacity>

            {/* <Button title="delete" /> */}
            <TouchableOpacity  style={{
                alignItems:'flex-end',
                marginRight:5
            }}
            // onPress={deleteCAll}
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
                      { text: "OK", onPress: () => deleteSpecificItem(c_name, round)}
                    ],
                    { cancelable: false }
                  );

                // setSelectedKind(kind);
                // setSelectedsent(sentence);
                // console.log("test" + selected_sent);
                
                
            }}
            >
                <Text style={{color:'grey', margin:2}}>削除</Text>
            </TouchableOpacity>
        </View>
      );

    // function onpressCheck(){
    //     console.log(new_cname);
    //     console.log(new_date);
    //     console.log(new_round);
    //     console.log("test dayo");
    // }

    useEffect(()=>{
        getallCDatafrom();
    }, []);

    return(
        <SafeAreaView style={styles.container}>
                {/* modal */}
            <View style={styles.centeredView}>
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
                            <Text style={styles.modalText}>会社名</Text>
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
                                textAlign: 'center'
                            }}
                            placeholder="〜株式会社"
                            placeholderTextColor="grey"
                            onChangeText={text => setNewCname(text)}
                        ></TextInput>

                        <Text style={styles.modalText}>日付</Text>
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
                                textAlign: 'center',
                            }}
                            placeholder="○月○日"
                            placeholderTextColor="grey"
                            onChangeText={text => setNewDate(text)}
                        ></TextInput>

                                <Text style={styles.modalText}>状況</Text>
                                {/* <Text style={{ marginVertical: 20, marginLeft: 30 }}>状況</Text> */}
                                <RNPickerSelect
                                onValueChange={(value) => setNewRound(value)}
                                items={[
                                    { label: '第一次面接', value: '第一次面接' },
                                    { label: '第二次面接', value: '第二次面接' },
                                    { label: '第三次面接', value: '第三次面接' },
                                    { label: '第四次面接', value: '第四次面接' },
                                    { label: '最終面接', value: '最終面接' },
                                    { label: '面談', value: '面談' }
                                ]}
                                style={styles}
                                placeholder={{ label: '選択してください', value: '' }}
                                // Icon={() => (<Text style={{ position: 'absolute', right: 95, top: 10, fontSize: 18, color: '#789' }}>▼</Text>)}
                                />
                 
                        

                            <Pressable 
                            style={[styles.button1, styles.buttonClose]}
                            onPress={insertCompanySentence}
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
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>＋新規追加</Text>
                    </Pressable>

                    {/* <List> */}

                    {/* </List> */}
            </View>
            
            
            <View style={styles.listbutton}>
            <FlatList
                            data={CData_array}
                            renderItem={companyRenderItem}
                            // renderItem={({ item }) => (
                            //     <ListItem
                            //       roundAvatar
                            //       company_name={item.company_name}
                            //       date={item.date}
                            //       round={item.round}
                            //       containerStyle={{borderBottomWidth: 0}}
                            //     />
                            //   )}
                            keyExtractor={item => JSON.stringify(item.id)}
                            ItemSeparatorComponent={renderSeparator}
                        />
                {/* <TouchableOpacity onPress={() => navigation.navigate('CompanyDetail')}>
                    
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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

    container: {
      flex: 1,
      backgroundColor: 'gainsboro',
    //   alignItems: 'center',
    //   justifyContent: 'center',
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
        padding: 60,
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
      flat_list_value_style: {
        paddingTop: 10,
        paddingLeft: 100,
        paddingRight: 100,
        fontSize: 18,

        backgroundColor:'lightgrey',
        color: 'darkslategrey'
        
    },
    allitem:{
        flex: 0.1,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: "black",
        shadowOffset: {
        width: 2,
        height: 2,
        },
        shadowRadius:2,
        shadowOpacity: 2,
        justifyContent: 'flex-end',
        marginBottom: 3
    },
    koko: {
        borderRadius: 5
    }

  });