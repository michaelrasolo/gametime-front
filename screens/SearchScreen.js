<<<<<<< HEAD
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
=======
import React from 'react';
import {Modal, Button, StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import SearchList from '../components/SearchList';
import RadioButtons from '../components/RadioButtons';
import GreyButton from '../components/GreyButton';
import OrangeButton from '../components/OrangeButton';
import Inputs from '../components/Inputs';
import DateSearch from '../components/DateSearch';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import RadioButtons2 from '../components/RadioButton2';

export default function SessionScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [gameGroup, setGameGroup] = useState(1);
  const [teamGroup, setTeamGroup] = useState(1);

 return (
    <SafeAreaView style={styles.container}>
    <SearchList/>
    <View style={styles.middleSection}>
    <ScrollView>
    <View style={styles.titleSection}>
    <Text style={styles.title}>Récurrence</Text>
    <View style={styles.fieldSection}>
    <View>
    <Text style={styles.fieldName}>Hebdomadaire</Text>
    <Checkbox    
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined} />
          </View>
          <View>
          <Text style={styles.fieldName}>Date limite</Text>
  <DateSearch/>
  </View>

  </View>
  </View>
    <View style={styles.titleSection}>
    <Text style={styles.title}>Type de Game</Text>
  <RadioButtons leftTitle={"3X3"} midTitle={"5X5"} rightTitle={"Freestyle"} />
  </View>
  <View style={styles.titleSection}>
    <Text style={styles.title}>Niveau Game</Text>
  <RadioButtons leftTitle={"Rookies"} midTitle={"Ballers"} rightTitle={"All-Stars"} />
  </View>
      <View style={styles.titleSection}>
    <Text style={styles.title}>Nombre de joueurs</Text>
    <View style={styles.fieldSection}>
    <View style={styles.SubfieldSection}>
    <Text style={styles.fieldName}>Le Game</Text>
    <Inputs width={"50%"} height={50} />
    </View>
    <View style={styles.SubfieldSection}>
    <Text style={styles.fieldName}>Ma team</Text>
    <Inputs width={"50%"} height={50} />
    </View>
    </View>
    </View>
    <View style={styles.titleSection}>
    <Text style={styles.title}>Intensité du game</Text>
  <RadioButtons2 leftTitle={"3X3"} rightTitle={"Freestyle"} />
  </View>

  </ScrollView>
  </View>
  <OrangeButton title={"Créer le game"} width={"60%"}/>
    </SafeAreaView>
 );
>>>>>>> 765d02284f0044729c3f3da05f274526b5a5fc31
}

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
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
=======
     flex:1,
     backgroundColor:"#242424",
      alignItems:"center",
      justifyContent:"space-around",
  },  
  middleSection:{
    paddingTop:40,
    height:"75%",
  },
  title: {
    alignItems:'center',
    color: 'white',
    fontSize: 25,
  },
  fieldSection: {
    width:"100%",
    padding: 15,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  }, 
  SubfieldSection:{width:"80%", alignItems:"center"},
   fieldName: {
    color: 'white',
    fontSize: 17,
    padding: 5,
  },
  titleSection: {
    alignItems: 'center',
   }
>>>>>>> 765d02284f0044729c3f3da05f274526b5a5fc31
})