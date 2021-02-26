import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Pressable , FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from "expo-sqlite";


// import CompanyList from './CompanyList';
// import CompanyDetail from './CompanyDetail';

const Stack = createStackNavigator();
const db = SQLite.openDatabase('db');

export default function CompanyDetail({route, navigation}) {

    const situationRenderItem = ({item}) => <Flat_list_company id={item.id} round={item.round}/>;

    const {id} = route.params;
    const {c_name} = route.params;
    const {round} = route.params;
    const [situationdata, setSituationData] = useState([]);

    const getSituation = () => {

        db.transaction(
        tx => {
            tx.executeSql(
            'select id, round from companys WHERE company_name = ?',
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

    const Flat_list_company = ({round}) => (
        <View style={{margin: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center', borderRadius: 9}}>
            <TouchableOpacity>
                <Text style={{fontSize: 18}}>⚫︎ {round}</Text>
            </TouchableOpacity>
        </View>
      );

    useEffect(()=>{
        getSituation();
    }, []);

    return(
        <SafeAreaView style={styles.container}>

            {/* <View style={styles.back}>

            </View> */}

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
                <View style={{marginLeft: 5, flex: 0.8}}>
                    <Text style={{fontSize: 20}}>今までの面接状況</Text>
                    <FlatList
                                data={situationdata}
                                renderItem={situationRenderItem}
                                keyExtractor={item => JSON.stringify(item.id)}
                                // keyExtractor={(item, id) => id.toString()}
                                // ItemSeparatorComponent={renderSeparator}
                    />
                </View>

                <View style={styles.joukyouList}>

                </View>
                
            </View>

            <View style={styles.body}>
                <Text>id: {JSON.stringify(id)}</Text>
                <Text>Company Name: {JSON.stringify(c_name)}</Text>
                <Text>{JSON.stringify(round)}</Text>
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
    }

  });