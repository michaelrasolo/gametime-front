import React, {  useState, useEffect } from 'react';
import {Modal, Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import DateSearch from '../components/DateSearch';
import SearchList from '../components/SearchList';
import HeaderLogo from '../components/HeaerLogo';
import GreyButton from '../components/GreyButton';
import OrangeButton from '../components/OrangeButton';
import Gamecard from '../components/GameCard';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-ionicons";
import { auto } from '@popperjs/core';

export default function SessionScreen({ navigation }) {
  const [sessions, setSessions] = useState([]);


  useEffect(() => {
    fetch(`http://192.168.10.149:3000/sessions`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.data)
        setSessions(data.data)
        
      });
  }, []);

  
  const gamecards = sessions.map((data, i) => {
    return (
      <Gamecard key={i} height={220} playground={data.playground.name}/>
     
    );
  });
  console.log(sessions)
  
  return (
    <View style={styles.container}>
      <HeaderLogo />
      <View>
        <View style={styles.searchListSection}>
          <SearchList style={styles.searchList} />
        </View>
        <View style={styles.buttonSection}>
          <OrangeButton title='Liste' width='43%' />
          <GreyButton title='Carte' width='43%' />
        </View>
      </View>
      <View style={styles.SessionsSection}>
        <ScrollView>
          {gamecards}
          <Gamecard level="baller" gametype='Freestyle' height={220} playground='Terrain de basket champ de mars' city='Paris' date='Jeudi 11 mai' hour='15h00' players='3' maxplayers='10' />
          <Gamecard level="baller" gametype='Freestyle' height={220} playground='Terrain de basket champ de mars' city='Paris' date='Jeudi 11 mai' hour='15h00' players='3' maxplayers='10' />

        </ScrollView>
      </View>






    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"flex-start",
    backgroundColor:'#242424',
  },
  searchListSection: {
    alignItems: 'center',
    padding:10
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent : 'space-around',
    padding : 10,
   },
  SessionsSection: {
    padding :10,
    borderWidth: 1,
    height: "auto",
    // flexGrow: 1, // Ensure the ScrollView expands to fill the available space
    borderColor:"red",
    // minHeight:1000,
  },
})