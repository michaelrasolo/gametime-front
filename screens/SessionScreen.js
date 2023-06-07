import React, { useState, useEffect } from 'react';
import { Modal, Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import HeaderNoLogo from '../components/HeaderNoLogo';
import RadioButtons3 from '../components/RadioButton3';
import Gamecard from '../components/GameCard';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-ionicons";
import { auto } from '@popperjs/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { selectGame } from '../reducers/game';
import Config from "../config";
import SessionPage from '../components/SessionPage';

const IPAdresse = Config.IPAdresse;

export default function SessionScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const game = useSelector((state) => state.game.value);
  const [sessions, setSessions] = useState([]);
  const [PressedButton, setPressedButton] = useState("");
  const dispatch = useDispatch();
  const [cardPress, setCardPress] = useState (false);

  useEffect(() => {

    fetch(`${IPAdresse}/sessions/futur/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if(data.result ) {
          setSessions(data.formattedData)
        // console.log('user token:', user.token, ' data: ',data )
        
          
        }
      });
  }, []);

  const handleButtonPress = (value) => {
    if(value === 'A venir') {
      fetch(`${IPAdresse}/sessions/futur/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setSessions(data.formattedData)
      });
    } else {
      fetch(`${IPAdresse}/sessions/past/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setSessions(data.formattedData)
      });
    }
  }

  const handleCardPress = (gameId) => {
    dispatch(selectGame(gameId));
    setCardPress(true)
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
        formattedDate={moment(data.date).format('dddd Do MMMM, LT')}
        hour={data.hour}
        playground={data.playground.name}
        source={imageSource}
        city={data.playground.city}
        totalParticipants={data.totalParticipants}
        maxParticipants={data.maxParticipants}
        level={data.level}
        sessionType={data.sessionType}
        onPress={() => handleCardPress(data._id)}
      />
    );
  });


  return (
    <View style={styles.container}>
      {!cardPress && (
      <>
      <HeaderNoLogo onPress={() => navigation.navigate("Search")} text={'Mes Sessions'}/>
      <View style={styles.content}>
        <View style={styles.buttonSection}>
          <RadioButtons3 onPress={handleButtonPress} leftTitle='A venir' rightTitle='Passées' value={PressedButton}/>
        </View>
        <View style={styles.SessionsSection}>
          <ScrollView>
            {gamecards}
          </ScrollView>
        </View>
      </View>
      </>
      )}
          {cardPress && <SessionPage onPress={() => setCardPress(false)}/>}
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