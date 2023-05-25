import React, { useEffect } from 'react';
import { Modal, Button, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import MapListSearchBar from '../components/MapListSearchBar';
import SearchList from '../components/SearchList';
import Checkbox from 'expo-checkbox';
import DateSearch from '../components/DateSearch';
import RadioButtons from '../components/RadioButtons';
import Inputs from '../components/Inputs';
import RadioButtons2 from '../components/RadioButton2';
import OrangeButton from '../components/OrangeButton';
import ConfettiCannon from 'react-native-confetti-cannon';
import MapPlayground from '../components/MapPlayground';
import NumericInput from "react-native-numeric-input";

import { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaygroundList, emptySelected } from '../reducers/playground';
import { setLocation } from '../reducers/location';

import Config from "../config";

const IPAdresse = Config.IPAdresse;

export default function CreateSession({ navigation }) {
  const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(false)
  const [isMapVisible, setMapVisible] = useState(true)
  const [isWeekly, setIsWeekly] = useState(false);
  const [bringBall, setBringBall] = useState(false);
  const [gameGroup, setGameGroup] = useState(1);
  const [teamGroup, setTeamGroup] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState()
  const [Mood, setMood] = useState()
  const [SessionType, setSessionType] = useState()
  const [limitDate, setLimitDate] = useState()
  const [showConfetti, setShowConfetti] = useState(false);


  const user = useSelector((state) => state.user.value);
  const playgrounds = useSelector((state) => state.playground.value);


  const handleCloseModal = () => {
    setModalVisible(!isModalVisible)
    dispatch(setPlaygroundList([]))
    dispatch(emptySelected())
    dispatch(setLocation(null))
    setMapVisible(true)
    setListVisible(false)
  }

  const handleMap = () => {
    setMapVisible(!isMapVisible)
  }

  const handleList = () => {
    setListVisible(!isListVisible)
  }

  const handleLevelPress = (value) => {
    setSelectedLevel(value);
  }

  const handleMoodPress = (value) => {
    setMood(value);
  }

  const handleSessionPress = (value) => {
    setSessionType(value);
  }
  const handleLimitDate = (value) => {
    setLimitDate(value)
  }

const selectedDate = new Date(playgrounds.selectedPlayground.date);
const timeString = playgrounds.selectedPlayground.time ? playgrounds.selectedPlayground.time : "12:00"

    // Convert time from string to Date object
const timeArray = timeString.split(':');

    // Add the time to the date
    selectedDate.setHours(timeArray[0]);
    selectedDate.setMinutes(timeArray[1]);

  const handleValidation = () => {
    setShowConfetti(true)

    fetch(`${IPAdresse}/sessions/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          playground:  playgrounds.selectedPlayground.playgroundId,
          sessionType: SessionType,
          date: selectedDate,
          level: selectedLevel,
          mood : Mood,
          admin: true,
          ball: bringBall,
          token : user.token,
          group : teamGroup,
          maxParticipants : gameGroup,
          frequency: isWeekly,
          limitDate: limitDate,
      }
      ),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result)
        setShowConfetti(true)
        dispatch(emptySelected())
      });
  }

  return (
    <SafeAreaView style={styles.container} >
   {!showConfetti && 
   <>
   <SearchBar 
   name={playgrounds.selectedPlayground.name ? playgrounds.selectedPlayground.name : 'Choisis un terrain'} 
   onPress={() => {setModalVisible(true)}} />
      <Modal
        animationType="slide"
        statusBarTranslucent={true}
        visible={isModalVisible}>
        <SafeAreaView style={styles.modal}>
          <MapListSearchBar handleList={handleList} handleMap={handleMap} handleCloseModal={handleCloseModal} />
          {isListVisible && <SearchList handleList={handleList} handleMap={handleMap} />}
          {isMapVisible && <MapPlayground handleCloseModal={handleCloseModal} />}
        </SafeAreaView>
      </Modal>
      <View style={styles.middleSection}>
        <ScrollView>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Récurrence</Text>
            <View style={styles.fieldSection}>
              <View style={styles.checkSection}>
                <Text style={styles.fieldName}>Hebdomadaire</Text>
                <Checkbox
                  value={isWeekly}
                  onValueChange={() => setIsWeekly(!isWeekly)}
                  color={isWeekly ? '#4630EB' : undefined} />
                  </View>
              <View>
                <Text style={styles.fieldName}>Date limite</Text>
                <DateSearch selectDate={handleLimitDate}/>
              </View>

            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Type de game</Text>
            <RadioButtons  onPress={handleSessionPress} leftTitle={"3X3"} midTitle={"5X5"} rightTitle={"Freestyle"} />
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Niveau du game</Text>
            <RadioButtons onPress={handleLevelPress} leftTitle={"Rookies"} midTitle={"Ballers"} rightTitle={"All-Stars"} />
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Nombre de joueurs</Text>
            <View style={styles.fieldSection}>
              <View style={styles.SubfieldSection}>
                <Text style={styles.fieldName}>Nombre maximum</Text>
                <NumericInput
                  totalHeight={35}
                  minValue={1}
                  valueType="integer"
                  rightButtonBackgroundColor="rgba(59, 59, 59, 0.8)"
                  iconStyle={{ color: "#FB724C" }}
                  leftButtonBackgroundColor="rgba(59, 59, 59, 0.8)"
                  textColor="#F0F0F0"
                  onChange={(value) => setGameGroup(value)} value={gameGroup}
                />
              </View>
              <View style={styles.SubfieldSection}>
                <Text style={styles.fieldName}>Ma team</Text>
                <NumericInput
                  totalHeight={35}
                  minValue={1}
                  valueType="integer"
                  rightButtonBackgroundColor="rgba(59, 59, 59, 0.8)"
                  iconStyle={{ color: "#FB724C" }}
                  leftButtonBackgroundColor="rgba(59, 59, 59, 0.8)"
                  textColor="#F0F0F0"
                  onChange={(value) => setTeamGroup(value)} value={teamGroup}
                />
              </View>
            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Intensité du game</Text>
            <RadioButtons2 onPress={handleMoodPress} leftTitle={"Chill"} rightTitle={"Déter"} />
            <Text style={styles.fieldName}>J'apporte un ballon</Text>

            <Checkbox
              value={bringBall}
              onValueChange={() => setBringBall(!bringBall)}
              color={bringBall ? '#4630EB' : undefined} />
          </View>



        </ScrollView>
      </View>
      <OrangeButton onPress={() => handleValidation()} title={"Créer le game"} width={"60%"} />
      </>
      }
      {showConfetti && (
    <View style={styles.confettiContainer}>
            <View style={styles.confettiText}>

      <Text style={GlobalStyles.h2}>Votre game est bien créé !</Text>
      </View>

      <View style={styles.confettiButtons}>
      <OrangeButton onPress={() => navigation.navigate('TabNavigator', { screen: 'Session' })}title="Voir sessions" width={"45%"}/>
      <OrangeButton onPress={()=> setShowConfetti(false)}title="Créer session" width={"45%"}/>
      </View>
        <ConfettiCannon count={300} origin={{x: -10, y: 0}} />

  </View>
  
  )}
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop:30,
  },
  modal: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleSection: {
    paddingTop: 40,
    height: "75%",
  },
  title: {
    alignItems: 'center',
    color: 'white',
    fontSize: 25,
  },
  fieldSection: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  SubfieldSection: { width: "80%", alignItems: "center" },
  fieldName: {
    color: 'white',
    fontSize: 17,
    padding: 5,
  },
  titleSection: {
    alignItems: 'center',
  },
  confettiContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  confettiButtons:{
    flexDirection:"row",
    width : "90%",
    justifyContent:"space-between",

  },
  confettiText: {
    alignItems: "center",

    marginVertical:"20%"
  },
  checkSection: {
    alignItems:"center"
  }
})