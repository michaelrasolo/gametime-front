import React from 'react';
import {Modal, Button, StyleSheet, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import DateSearch from '../components/DateSearch';
import SearchList from '../components/SearchList';

export default function SessionScreen({ navigation }) {

 return (
   <View style={styles.container}>
    <SearchList/>
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