import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Modal , Pressable, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


// const Stack = createStackNavigator();


export default function CompanyList({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);

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
                                backgroundColor: 'lightgrey',
                                paddingLeft: 35,
                                paddingRight: 35,
                                marginBottom: 5,
                                fontSize: 17,
                            }}
                            placeholder="〜株式会社"
                            placeholderTextColor="grey"
                            // onChangeText={text => setNewBunn(text)}
                        ></TextInput>

                        <Text style={styles.modalText}>日付</Text>
                            <TextInput
                            style={{
                                backgroundColor: 'lightgrey',
                                paddingLeft: 35,
                                paddingRight: 35,
                                marginBottom: 5,
                                fontSize: 17,
                            }}
                            placeholder="○月○日"
                            placeholderTextColor="grey"
                            // onChangeText={text => setNewBunn(text)}
                        ></TextInput>

                        <Text style={styles.modalText}>状況</Text>
                            <TextInput
                            style={{
                                backgroundColor: 'lightgrey',
                                paddingLeft: 35,
                                paddingRight: 35,
                                marginBottom: 5,
                                fontSize: 17,
                            }}
                            placeholder=""
                            placeholderTextColor="grey"
                            // onChangeText={text => setNewBunn(text)}
                        ></TextInput>

                            <Pressable 
                            style={[styles.button1, styles.buttonClose]}
                            // onPress={() => setModalVisible(!modalVisible)}
                            >
                                 <Text style={styles.textStyle}>保存</Text>
                            </Pressable>

                        
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
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
            </View>
            
            
            <View style={styles.listbutton}>
                <TouchableOpacity onPress={() => navigation.navigate('CompanyDetail')}>
                    
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
    listbutton: {
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: 55,
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
        marginBottom: 10
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        // marginBottom: 10
      },
      buttonOpen: {
        backgroundColor: "tomato",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        // fontSize: 
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        // marginTop: 10,
        
      },


      modalText: {
        marginBottom: 8,
        textAlign: "center",
        fontSize: 20
      }

  });