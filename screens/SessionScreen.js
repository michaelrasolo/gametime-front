import React, { useState, useEffect } from 'react';
import { Modal, Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import HeaderLogo from '../components/HeaerLogo';
import RadioButtons3 from '../components/RadioButton3';
import Gamecard from '../components/GameCard';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-ionicons";
import { auto } from '@popperjs/core';
import { useSelector } from 'react-redux';

export default function SessionScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [sessions, setSessions] = useState([]);
  const [PressedButton, setPressedButton] = useState("");

  useEffect(() => {
    fetch(`http://192.168.10.175:3000/sessions/futur/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setSessions(data.formattedData)
        console.log('user token:', user.token, ' data: ',data )
        
      });
  }, []);
  const handleButtonPress = (value) => {
    if(value === 'A venir') {
      fetch(`http://192.168.10.175:3000/sessions/futur/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setSessions(data.formattedData)
      });
    } else {
      fetch(`http://192.168.10.175:3000/sessions/past/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setSessions(data.formattedData)
      });
    }
  }

  const images = {
    playground1: require('../assets/playgrounds/playground1.jpg'),
    playground2: require('../assets/playgrounds/playground2.jpg'),
    playground3: require('../assets/playgrounds/playground3.jpg'),
    playground4: require('../assets/playgrounds/playground4.jpg'),
    playground5: require('../assets/playgrounds/playground5.jpg'),
    playground6: require('../assets/playgrounds/playground6.jpg'),
  };

  const gamecards = sessions && sessions.map((data, i) => {
    const imagePath = `playground${data.playground.photo}`;
    const imageSource = images[imagePath];
    return (
      <Gamecard key={i} height={220}
        formattedDate={data.formattedDate}
        formattedTime={data.formattedTime}
        hour={data.hour}
        playground={data.playground.name}
        source={imageSource}
        city={data.playground.city}
        totalParticipants={data.totalParticipants}
        maxParticipants={data.maxParticipants}
        level={data.level}
        sessionType={data.sessionType}

      />
    );
  });


  return (
    <View style={styles.container}>
      <HeaderLogo />
      <View style={styles.content}>
        <View style={styles.buttonSection}>
          <RadioButtons3 onPress={handleButtonPress} leftTitle='A venir' rightTitle='Passées' value={PressedButton}/>
        </View>
        <View style={styles.SessionsSection}>
          <ScrollView>
            {sessions && gamecards}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#242424',
  },
  content: {
    flex:1,

  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  SessionsSection: {
    paddingLeft:10,
    paddingRight:10,
    flex: 1, 
  },
})