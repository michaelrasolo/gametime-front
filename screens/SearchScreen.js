import React, { useState, useEffect } from 'react';
import { Modal,SafeAreaView, Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import DateSearch from '../components/DateSearch';
import SearchList from '../components/SearchList';
import HeaderLogo from '../components/HeaerLogo';
import GreyButton from '../components/GreyButton';
import OrangeButton from '../components/OrangeButton';
import Gamecard from '../components/GameCard';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-ionicons";
import { auto } from '@popperjs/core';
import { useDispatch } from 'react-redux';
import SessionBar from '../components/SessionBar';
import MapSearchBar from '../components/MapSearchBar';
import MapSession from '../components/MapSessions';
import { emptySelected } from '../reducers/playground'; 

import Config from "../config";

const IPAdresse = Config.IPAdresse;

export default function SessionScreen({ navigation }) {
  const dispatch = useDispatch()
  const [sessions, setSessions] = useState([]);
  const [cardPress, setCardPress] = useState (false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(`${IPAdresse}/sessions/all`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.data[0].playground.photo)
        setSessions(data.formattedData)
      });
  }, []);

const handleCardPress = (value) => {
  console.log(value)
  // navigation.navigate('Join')
  setCardPress(true)
  
}

const handleOpenModal = () => {
  dispatch(emptySelected())
  setModalVisible(true)
}

const handleCloseModal = () => {
  setModalVisible(!isModalVisible)
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
        onPress={() => handleCardPress(data._id)}

      />
    );
  });


  return (
    <View style={styles.container}>
      <HeaderLogo />
      <View style={styles.content}>
        <SessionBar name="Paris 17" onPress={handleOpenModal}/>
        <Modal
        animationType="slide"
        statusBarTranslucent={true}
        visible={isModalVisible}>
        <SafeAreaView style={styles.modal}>
          <MapSearchBar handleCloseModal={handleCloseModal} />
          <MapSession handleCloseModal={handleCloseModal}/>
        </SafeAreaView>
      </Modal>
      {!cardPress &&  <View style={styles.content}>
       <Text style={styles.title}>Les sessions autour de toi</Text>
        <View style={styles.SessionsSection}>
          <ScrollView>
            {sessions && gamecards}
          </ScrollView>
        </View> 
      </View> }
      <Text>toto</Text>
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
    alignItems:"center",
    paddingTop:20,
// borderWidth:3
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    padding: 10,
  },
  SessionsSection: {
    padding: 10,
    // height: "auto",
    flex: 1, // Ensure the ScrollView expands to fill the available space
  },
  title: {
    alignItems: 'center',
    color: 'white',
    fontSize: 25,
  },
  modal: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
})