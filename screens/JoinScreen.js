import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import Inputs from "../components/Inputs";
import HeaderNoLogo from "../components/HeaderNoLogo";
import RadioButtons from "../components/RadioButtons";
import GreyButton from "../components/GreyButton";
import OrangeButton from "../components/OrangeButton";
import DateSearch from "../components/DateSearch";
import { GlobalStyles } from "../components/GlobalStyles";
import Checkbox from "expo-checkbox";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import NumericInput from "react-native-numeric-input";

export default function JoinScreen({ navigation }) {
  const [sessionInfos, setSessionInfos] = useState(null);
  const [sessionParticipants, setSessionParticipants] = useState(null);
  const [bringBall, setBringBall] = useState(false);
  const [group, setGroup] = useState(1);
  const [hasJoined, setHasJoined] = useState('');
  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();


// INITIALISATION
  useEffect(() => {
    fetch(`http://192.168.10.175:3000/sessions/game/646b3cd1b7f77417138297a6/`) // Token + User
      .then((res) => res.json())
      .then((response) => {
        setSessionInfos(response.sessionData); // Session data
        setSessionParticipants(response.totalParticipants); // Count of session members
      })
      .catch((error) => {
        console.log("Error fetching session data:", error);
      });
      fetch(`http://192.168.1.76:3000/sessions/check/646b3cd1b7f77417138297a6/${user.token}`) // Token + User
      .then((res) => res.json())
      .then((response) => {
        setHasJoined(response.result)
      })
  }, []);
console.log("hasJoined", hasJoined)
  // FUNCTION JOIN THE GAME

  const handleJoin = () => {
    fetch(`http://192.168.10.175:3000/sessions/join/6464f4eda9764ac33bf06d40/nVOst4ecUhMv6upHaUE7rxj9Vbk1E93q`, {
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
  return (
    <>
      {sessionInfos ? ( // Display page only if sessionInfo has been set
        <View style={styles.container}>
          <HeaderNoLogo />
          <View style={styles.photoContainer}>
            <ImageBackground
              style={styles.playgroundPhoto}
              source={require(`../assets/playgrounds/playground2.jpg`)}
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
                  Niveau de jeu: {sessionInfos.level}
                </Text>
                <Text style={GlobalStyles.text}>
                  Ambiance de jeu: {sessionInfos.mood}
                </Text>
              </View>
              <View style={styles.participantsBox}>
                <FontAwesome5 name={"users"} color={"#F0F0F0"} size={18} />
                <Text style={GlobalStyles.text}>
                  {sessionParticipants} / {sessionInfos.maxParticipants}
                </Text>
              </View>
            </View>

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
});
