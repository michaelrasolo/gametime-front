import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

function Inputs(props){
    return(
        <View style={[styles.container, { width: props.width, height: props.height }]}>
            <Text style={styles.text}>{props.name}</Text>
            <TextInput style={styles.input} value={props.value} onChangeText={props.onChangeText} placeholder={props.name} placeholderTextColor='#B0B0B0'/>
        </View>
    )
}

export default Inputs

const styles = StyleSheet.create({
input: {
    width: '100%',
    color: '#fff',
  },
  container: {
    justifyContent: "center",
    height: 50,
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    paddingLeft: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#B0B0B0',
    width: 200,
    marginBottom:"4%"
  },
  text: {
    color: '#AEAEB2',
    fontSize: 8,
  }
});