import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

function Inputs(props){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{props.name}</Text>
            <TextInput style={styles.input} placeholder={props.name} placeholderTextColor='#fff'/>
        </View>
    )
}

export default Inputs

const styles = StyleSheet.create({
input: {
    height: 30,
    width: '100%'
  },
  container: {
    height: 50,
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    paddingLeft: 10,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#B0B0B0',
    width: 200,

  },
  text: {
    color: '#AEAEB2',
    fontSize: 8,
  }
});