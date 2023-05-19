import React from 'react';
import { Modal, Button, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import MapListSearchBar from '../components/MapListSearchBar';
import SearchList from '../components/SearchList';
import MapPlayground from '../components/MapPlayground';
import Checkbox from 'expo-checkbox';
import DateSearch from '../components/DateSearch';
import RadioButtons from '../components/RadioButtons';
import Inputs from '../components/Inputs';
import RadioButtons2 from '../components/RadioButton2';
import OrangeButton from '../components/OrangeButton';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPlaygroundList } from '../reducers/playground';

export default function CreateSession({ navigation }) {
  const dispatch = useDispatch()
  const playgrounds = useSelector((state) => state.playground.value);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(true)
  const [isMapVisible, setMapVisible] = useState(false)
  const [isWeekly, setIsWeekly] = useState(false);
  const [bringBall, setBringBall] = useState(false);
  const [gameGroup, setGameGroup] = useState(1);
  const [teamGroup, setTeamGroup] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState()


  const handleCloseModal = () => {
    setModalVisible(!isModalVisible)
    dispatch(setPlaygroundList([]))
  }

  const handleMap = () => {
    setMapVisible(!isMapVisible)
  }

  const handleList = () => {
    setListVisible(!isListVisible)
  }


  return (
    <SafeAreaView style={styles.container} >
      <SearchBar name={playgrounds.selectedPlayground.name ? playgrounds.selectedPlayground.name : 'Choisis un terrain'} onPress={() => {
        setModalVisible(true)
      }} />
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
              <View>
                <Text style={styles.fieldName}>Hebdomadaire</Text>
                <Checkbox
                  value={isWeekly}
                  onValueChange={setIsWeekly}
                  color={isWeekly ? '#4630EB' : undefined} />
              </View>
              <View>
                <Text style={styles.fieldName}>Date limite</Text>
                <DateSearch />
              </View>

            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Type de Game</Text>
            <RadioButtons leftTitle={"3X3"} midTitle={"5X5"} rightTitle={"Freestyle"} />
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Niveau du Game</Text>
            <RadioButtons leftTitle={"Rookies"} midTitle={"Ballers"} rightTitle={"All-Stars"} />
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Nombre de joueurs</Text>
            <View style={styles.fieldSection}>
              <View style={styles.SubfieldSection}>
                <Text style={styles.fieldName}>Le Game</Text>
                <Inputs width={"50%"} height={50} onChangeText={(value) => setGameGroup(value)} value={gameGroup} />
              </View>
              <View style={styles.SubfieldSection}>
                <Text style={styles.fieldName}>Ma team</Text>
                <Inputs width={"50%"} height={50} onChangeText={(value) => setTeamGroup(value)} value={teamGroup} />
              </View>
            </View>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Intensité du game</Text>
            <RadioButtons2 leftTitle={"Pour le fun"} rightTitle={"Pour la gagne"} />
            <Text style={styles.fieldName}>J'apporte un ballon</Text>

            <Checkbox
              value={bringBall}
              onValueChange={setBringBall}
              color={bringBall ? '#4630EB' : undefined} />
          </View>



        </ScrollView>
      </View>
      <OrangeButton title={"Créer le game"} width={"60%"} />
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "space-around",
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
  }
})