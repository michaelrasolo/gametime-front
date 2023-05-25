import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Button
} from "react-native";
import Inputs from "../components/Inputs";
import HeaderNoLogo from "../components/HeaderNoLogo";
import RadioButtons from "../components/RadioButtons";
import GreyButton from "../components/GreyButton";
import OrangeButton from "../components/OrangeButton";
import DateSearch from "../components/DateSearch";
import PlayersComponent from "../components/PlayersComponent";
import { GlobalStyles } from "../components/GlobalStyles";
import Checkbox from "expo-checkbox";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import NumericInput from "react-native-numeric-input";

import Config from "../config";

const IPAdresse = Config.IPAdresse;

export default function JoinScreen({ navigation }) {
  const [sessionInfos, setSessionInfos] = useState(null);
  const [sessionParticipants, setSessionParticipants] = useState(null);
  const [bringBall, setBringBall] = useState(false);
  const [group, setGroup] = useState(1);
  const [hasJoined, setHasJoined] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [participants, setParticipants] = useState([]);
  const user = useSelector((state) => state.user.value);
  const game = useSelector((state) => state.game.value);
  const dispatch = useDispatch();

  console.log("reducer:",game)
  console.log("user", user)


// INITIALISATION
  useEffect(() => {
    fetch(`${IPAdresse}/sessions/game/${game.gameId}`) // Game ID
      .then((res) => res.json())
      .then((response) => {
        response && setSessionInfos(response.sessionData); // Session data
        response && setSessionParticipants(response.totalParticipants); // Count of session members

        fetch(`${IPAdresse}/sessions/participants/infos/${game.gameId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('participants', data.participantsNames);
          setParticipants(data.participantsNames);
        })
        .catch((error) => {
          console.log("Error fetching participant names:", error);
        });
    })

        // console.log(selectedGame.gameId)
      .catch((error) => {
        console.log("Error fetching session data:", error);
      });
      fetch(`${IPAdresse}/sessions/check/646c7dc1c0e482bd17f67fc2/${user.token}`) // Token + User
      .then((res) => res.json())
      .then((response) => {
        response && setHasJoined(response.result)
      })
  }, []);

// console.log(sessionInfos)
  // FUNCTION JOIN THE GAME

  const handleJoin = () => {
    fetch(`${IPAdresse}/sessions/join/${game.value}/${user.token}`, {
method: 'PUT',
headers: {'Content-Type':'application/json'},
body: JSON.stringify({
  group: group,
  ball: bringBall
})
    })
    .then(response => response.json())
    .then(gameUpdate => {
      if (gameUpdate.result)
      console.log('Game joined !!');;

    })
  }
  const images = {
    playground1: require('../assets/playgrounds/playground1.jpg'),
    playground2: require('../assets/playgrounds/playground2.jpg'),
    playground3: require('../assets/playgrounds/playground3.jpg'),
    playground4: require('../assets/playgrounds/playground4.jpg'),
    playground5: require('../assets/playgrounds/playground5.jpg'),
    playground6: require('../assets/playgrounds/playground6.jpg'),
  };
  
  let imagePath = 'playground1';
  if (sessionInfos) {
    imagePath = `playground${sessionInfos.playground.photo}`;
  }
  
  const imageSource = images[imagePath];  

  return (
    <>
      {sessionInfos ? ( // Display page only if sessionInfo has been set
        <View style={styles.container}>
          <HeaderNoLogo />
          <View style={styles.photoContainer}>
            <ImageBackground
              style={styles.playgroundPhoto}
              source={imageSource}
            >
              <Text style={styles.playgroundTextTitle}>
                {sessionInfos.playground.name}, {sessionInfos.playground.city}
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={GlobalStyles.h2}>Game Time</Text>
              <Text style={styles.time}>
                {moment(sessionInfos.date)
                  .format("dddd")
                  .charAt(0)
                  .toUpperCase() +
                  moment(sessionInfos.date).format("dddd").slice(1)}{" "}
                {moment(sessionInfos.date).format("LL")}, à{" "}
                {moment(sessionInfos.date).format("LT")}
              </Text>
              <Text style={GlobalStyles.desc}>
                {sessionInfos.playground.name}{" "}
              </Text>
              <Text style={GlobalStyles.desc}>
                {sessionInfos.playground.address}
              </Text>
              <Text style={GlobalStyles.desc}>
                {sessionInfos.playground.postCode}{" "}
                {sessionInfos.playground.city}
              </Text>
            </View>

            <View style={styles.infosBox}>
              <View>
                <Text style={GlobalStyles.text}>
                  Type de game: {sessionInfos.sessionType}
                </Text>
                <Text style={GlobalStyles.text}>
                  Niveau du game: {sessionInfos.level}
                </Text>
                <Text style={GlobalStyles.text}>
                  Intensité du game: {sessionInfos.mood}
                </Text>
              </View>
              <View style={styles.participantsBox}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                <FontAwesome5 name={"users"} color={"#F0F0F0"} size={18} />
                <Text style={GlobalStyles.text}>
                  {sessionParticipants} / {sessionInfos.maxParticipants}
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
              <View style={styles.modal}>
                    <Text style={styles.modalText}>Participants:</Text>
                {participants.length > 0 ? (
                      <PlayersComponent/>
                ) : (
                  <Text style={styles.modalText}>Aucun participant</Text>
                )}
                    <OrangeButton title="Fermer" onPress={() => setModalVisible(false)} width={'50%'} />
              </View>
            </Modal>
            <View style={styles.inputBox}>
              <View style={styles.ballSection}>
                <Text style={[GlobalStyles.text, { marginBottom: "8%" }]}>
                  Ma team
                </Text>
                <NumericInput
                  totalHeight={35}
                  minValue={1}
                  valueType="integer"
                  rightButtonBackgroundColor="rgba(59, 59, 59, 0.8)"
                  iconStyle={{ color: "#FB724C" }}
                  leftButtonBackgroundColor="rgba(59, 59, 59, 0.8)"
                  textColor="#F0F0F0"
                  value={group}
                  onChange={(value) => setGroup(value)}
                />
              </View>
              <View style={styles.ballSection}>
              <Text style={[GlobalStyles.text, { marginBottom: "8%" }]}>
                  J'apporte un ballon</Text>
                <Checkbox
                  value={bringBall}
                  onValueChange={() => setBringBall(!bringBall)}
                  color={bringBall ? "#FB724C" : undefined}
                  style={{
                    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                    margin: 6,
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              {hasJoined ?
              <GreyButton title={"Déjà inscrit"} width={"80%"} />
              :
              <OrangeButton title={"Participer au game"} width={"80%"} onPress={handleJoin}/>}
            </View>
          </View>
        </View>
      ) : ( // If sessionInfo is not set
        <Text>Loading...</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },
  photoContainer: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 2) / 3,
  },
  playgroundPhoto: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    paddingBottom: "10%",
  },
  playgroundTextTitle: {
    color: "#F0F0F0",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 4,
    fontSize: 20,
    paddingHorizontal: "10%",
    paddingVertical: "1%",
    fontWeight: "700",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  infoContainer: {
    flex: 1,

    marginHorizontal: "8%",
    height: "100%",
    justifyContent: "space-between",
    marginBottom: "8%",
  },
  time: {
    fontSize: 16,
    marginBottom: "2%",
    color: "#FB724C",
  },
  address: {
    color: "#AEAEB2",
    fontSize: 14,
  },
  participantsBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  infosBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height:"18%"
  },
  ballSection: {
    height:"100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
    modal: {
      height: "45%",
      marginTop: "auto",
      backgroundColor: "#515153",  
    alignItems:"center"  },
    modalText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#FB724C',
      marginTop: 5
    },
  });
