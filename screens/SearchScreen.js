import React, { useState, useEffect } from 'react';
import { Modal,SafeAreaView, Button, StyleSheet, Text, View, ScrollView,Dimensions } from 'react-native';
import HeaderLogo from '../components/HeaerLogo';
import Gamecard from '../components/GameCard';
import { useDispatch, useSelector } from 'react-redux';
import SessionBar from '../components/SessionBar';
import MapSearchBar from '../components/MapSearchBar';
import MapSession from '../components/MapSessions';
import { emptySelected, setPlaygroundList } from '../reducers/playground'; 
import { setLocation } from '../reducers/location';
import SessionPage from '../components/SessionPage';
import moment from "moment";
import Config from "../config";
import { selectGame } from '../reducers/game';
const IPAdresse = Config.IPAdresse;
import { GlobalStyles } from '../components/GlobalStyles';
export default function SessionScreen({ navigation }) {
  const dispatch = useDispatch()
  const [sessions, setSessions] = useState([]);
  const [cardPress, setCardPress] = useState (false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [titre,setTitre] = useState('Les sessions autour de toi')
  const [isJoinVisible, setIsJoinVisible] = useState(false)
  
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
  setModalVisible(true)
}

const handleCloseModal = () => {
  setModalVisible(false)
  dispatch(setPlaygroundList([]))
  dispatch(emptySelected())
  dispatch(setLocation(null))
}





  const images = {
    playground1: require('../assets/playgrounds/playground1.jpg'),
    playground2: require('../assets/playgrounds/playground2.jpg'),
    playground3: require('../assets/playgrounds/playground3.jpg'),
    playground4: require('../assets/playgrounds/playground4.jpg'),
    
    
    playground5: require('../assets/playgrounds/playground5.jpg'),
    playground6: require('../assets/playgrounds/playground6.jpg'),
  };

const filteredPlayground = playgrounds.selectedPlayground.playgroundId && sessions.filter(data => data.playground._id === playgrounds.selectedPlayground.playgroundId)
const filteredDate = playgrounds.selectedPlayground.playgroundId && filteredPlayground .filter(data => data.date === playgrounds.selectedPlayground.date)

const games = (filteredPlayground  ? filteredPlayground  : sessions)

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
      {!cardPress &&  <View style={styles.content}>
      <HeaderLogo />
        <SessionBar name={playgrounds.selectedPlayground.name ? playgrounds.selectedPlayground.name : 'Trouve une session'}  onPress={handleOpenModal}/>
        <Modal
        animationType="slide"
        statusBarTranslucent={true}
        visible={isModalVisible}
        >{!isJoinVisible &&
        <View style={styles.modal}>
          <MapSearchBar handleCloseModal={handleCloseModal} />
          <MapSession handleJoin={() => setIsJoinVisible(true)} handleCloseModal={handleCloseModal}/>
        </View>}
        {isJoinVisible && <SessionPage/>}
      </Modal>
      <View style={styles.content}>
       <Text style={styles.title}>{titre}</Text>
        <View style={styles.SessionsSection}>
          <ScrollView>
            {sessions && gamecards}
          </ScrollView>
        </View> 
      </View> 
    </View>}
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

  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    padding: 10,
  },
  SessionsSection: {
    padding: 10,
    // height: "auto",
    width: Dimensions.get('window').width,
    // flex: 1, // Ensure the ScrollView expands to fill the available space
  },
  title: {
    alignItems: 'center',
    color: 'white',
    fontSize: 20,
    marginTop:"3%"
  },
  modal: {
    flex:1,
    justifyContent: "space-between",
    alignItems: "center",  },
})