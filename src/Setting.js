import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Setting({navigation}) {
    return(
        <View style={styles.container}>
        <Text>
            Hello, this is setting page
        </Text>
        <Button title="Home.js" onPress={()=>navigation.navigate('Home')} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });