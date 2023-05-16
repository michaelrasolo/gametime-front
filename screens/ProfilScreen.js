import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Inputs from '../components/Inputs';

export default function ProfilScreen({ navigation }) {


 return (
   <View style={styles.container}>
    <Text>ProfilScreen</Text>
    <Inputs/>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
     flex:1,
     paddingTop:100,
      alignItems:"center",
      justifyContent:"space-between",
      backgroundColor:'#242424',
  }})