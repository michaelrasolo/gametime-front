import React from 'react';
import {Modal, Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import DateSearch from '../components/DateSearch';
import SearchList from '../components/SearchList';

export default function SessionScreen({ navigation }) {

 return (
    <SafeAreaView>
    <SearchList/>
    </SafeAreaView>
 )
}

const styles = StyleSheet.create({
  container: {
     flex:1,
      alignItems:"center",
      justifyContent:"space-between"
  }})