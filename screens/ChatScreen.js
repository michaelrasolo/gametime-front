import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ChatComponent from '../components/Chat';

export default function ChatScreen({ navigation }) {
 return (
    <ChatComponent/>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop:30,
  }
})