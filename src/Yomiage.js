import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Yomiage({navigation}) {
    return(
        <View style={styles.container}>
        <Text>
            Hello, this is main app
        </Text>
        <Button title="Home.js" onPress={()=>navigation.navigate('Home')} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gainsboro',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });