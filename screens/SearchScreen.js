import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';

export default function SessionScreen({ navigation }) {
 return (
   <View style={styles.container}>
    <SearchBar name="Saisis ta ville"/>
    <Text>SessionScreen</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
     flex:1,
     paddingTop:100,
      alignItems:"center",
      justifyContent:"space-between"
  }})