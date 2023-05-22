import React, { useState, useEffect } from 'react';
import { Modal, Button, StyleSheet, Text, View, ScrollView } from 'react-native';
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
    fetch(`http://192.168.10.175:3000/sessions/all`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.data[0].playground.photo)
        setSessions(data.formattedData)
      });
  }, []);

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
        <SearchList style={styles.searchList} />
        <View style={styles.buttonSection}>
          <OrangeButton title='Liste' width='43%' />
          <GreyButton title='Carte' width='43%' />
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
// borderWidth:3
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    padding: 10,
  },
  SessionsSection: {
    padding: 10,
    borderWidth: 1,
    // height: "auto",
    flex: 1, // Ensure the ScrollView expands to fill the available space

  },
})