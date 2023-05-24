import React, { useState, useEffect } from 'react';
import { Modal,SafeAreaView, Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import HeaderLogo from '../components/HeaerLogo';
import Gamecard from '../components/GameCard';
import { useDispatch } from 'react-redux';
import SessionBar from '../components/SessionBar';
import MapSearchBar from '../components/MapSearchBar';
import MapSession from '../components/MapSessions';
import { emptySelected } from '../reducers/playground'; 
import { useSelector } from 'react-redux';
import moment from "moment";
import Config from "../config";
import SessionPage from '../components/SessionPage';
import { selectGame } from '../reducers/game';
const IPAdresse = Config.IPAdresse;

export default function SessionScreen({ navigation }) {
  const dispatch = useDispatch()
  const [sessions, setSessions] = useState([]);
  const [cardPress, setCardPress] = useState (false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [titre,setTitre] = useState('Les sessions autour de toi')
  
  const playgrounds = useSelector((state) => state.playground.value);
  
  useEffect(() => {
    fetch(`${IPAdresse}/sessions/all`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.formattedData[0].playground)
        setSessions(data.formattedData)
      });
  }, []);


  const game = useSelector((state) => state.game.value);
const handleCardPress = (value) => {
  dispatch(selectGame(value))
  setCardPress(true)
  
}

const handleOpenModal = () => {
  dispatch(emptySelected())
  setModalVisible(true)
}

const handleCloseModal = () => {
  setModalVisible(!isModalVisible)
  dispatch(emptySelected())

  
}





  const images = {
    playground1: require('../assets/playgrounds/playground1.jpg'),
    playground2: require('../assets/playgrounds/playground2.jpg'),
    playground3: require('../assets/playgrounds/playground3.jpg'),
    playground4: require('../assets/playgrounds/playground4.jpg'),
    playground5: require('../assets/playgrounds/playground5.jpg'),
    playground6: require('../assets/playgrounds/playground6.jpg'),
  };

const filteredGamecards = playgrounds.selectedPlayground.playgroundId && sessions.filter(data => data.playground._id === playgrounds.selectedPlayground.playgroundId)

const games = (filteredGamecards ? filteredGamecards : sessions)

const gamecards = games.map((data, i) => {
  const imagePath = `playground${data.playground.photo}`;
  const imageSource = images[imagePath];
  return (
    <Gamecard
      key={i}
      height={220}
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
        <HeaderLogo />
        <View style={styles.content}>
          <SessionBar name="Paris 17" onPress={handleOpenModal} />
          <Modal
            animationType="slide"
            statusBarTranslucent={true}
            visible={isModalVisible}
          >
            <SafeAreaView style={styles.modal}>
              <MapSearchBar handleCloseModal={handleCloseModal} />
              <MapSession handleCloseModal={handleCloseModal} />
            </SafeAreaView>
          </Modal>
          <View style={styles.content}>
            <Text style={styles.title}>{titre}</Text>
            <View style={styles.SessionsSection}>
              <ScrollView>
                {sessions && gamecards}
              </ScrollView>
            </View>
          </View>
        </View>
      </>
    )}
    {cardPress && <SessionPage/>}
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