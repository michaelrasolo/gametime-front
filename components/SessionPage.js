import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import HeaderNoLogo from "../components/HeaderNoLogo";
import GreyButton from "../components/GreyButton";
import OrangeButton from "../components/OrangeButton";
import PlayersComponent from "./PlayersComponent";
import { GlobalStyles } from "../components/GlobalStyles";
import Checkbox from "expo-checkbox";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import NumericInput from "react-native-numeric-input";
import ConfettiCannon from "react-native-confetti-cannon";
import Config from "../config";
import { useNavigation } from "@react-navigation/native";
const IPAdresse = Config.IPAdresse;

export default function SessionPage() {
  const navigation = useNavigation()
  const [sessionInfos, setSessionInfos] = useState(null);
  const [sessionParticipants, setSessionParticipants] = useState(null);
  const [bringBall, setBringBall] = useState(false);
  const [group, setGroup] = useState(1);
  const [hasJoined, setHasJoined] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.user.value);
  const game = useSelector((state) => state.game.value);

  // INITIALISATION: Game information and check for user in the game
  useEffect(() => {
    fetch(`${IPAdresse}/sessions/game/${game.gameId}/`) // Game ID
      .then((res) => res.json())
      .then((response) => {
        response && setSessionInfos(response.sessionData); // Session data
        response && setSessionParticipants(response.totalParticipants); // Count of session members
      })
      .catch((error) => {
        console.log("Error fetching session data:", error);
      });
    fetch(`${IPAdresse}/sessions/check/${game.gameId}/${user.token}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.result == true) {
          setHasJoined(response.result);
          setGroup(response.userGroup);
          setBringBall(response.ball);
        } else {
          setHasJoined(false);
        }
      });
    if (sessionInfos && moment(sessionInfos.date).isBefore(moment())) {
      setGameOver(true);
      console.log("moment", moment());
      console.log("date", sessionInfos.date);
      console.log("State:", gameOver);
    }
  }, [hasJoined, gameOver]);

  // FUNCTION JOIN THE GAME

  const handleJoin = () => {
    console.log("game:", game.gameId, "user:", user.token);
    fetch(`${IPAdresse}/sessions/join/${game.gameId}/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        group: group,
        ball: bringBall,
      }),
    })
      .then((response) => response.json())
      .then((gameUpdate) => {
        if (gameUpdate.result == true) console.log("You joined the game");
        setConfirmation(true);
      });
  };

  // FUNCTION QUIT THE GAME
  const handleQuit = () => {
    fetch(`${IPAdresse}/sessions/quit/${game.gameId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((gameUpdate) => {
        if (gameUpdate.result) console.log("You left the game.");
        setHasJoined(false);
        navigation.navigate('TabNavigator', {screen:'Search'});    
      });
  };
  // FUNCTION EDIT PARTICIPATION

  const handleEdit = () => {
    fetch(`${IPAdresse}/sessions/edit/${game.gameId}/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        group: group,
        ball: bringBall,
      }),
    })
      .then((response) => response.json())
      .then((gameUpdate) => {
        if (gameUpdate.result) console.log("You updated your participation");
        setConfirmation(true);
      });
  };

  const handleChat = () => {
    navigation.navigate('Chat');
  }
  const images = {
    playground1: require("../assets/playgrounds/playground1.jpg"),
    playground2: require("../assets/playgrounds/playground2.jpg"),
    playground3: require("../assets/playgrounds/playground3.jpg"),
    playground4: require("../assets/playgrounds/playground4.jpg"),
    playground5: require("../assets/playgrounds/playground5.jpg"),
    playground6: require("../assets/playgrounds/playground6.jpg"),
  };

  let imagePath = "playground1";
  if (sessionInfos) {
    imagePath = `playground${sessionInfos.playground.photo}`;
  }

  const imageSource = images[imagePath];

  return (
    <>
      {sessionInfos ? ( // Control if sessionInfos fetch to state is defined
        <View style={styles.container}>
          <HeaderNoLogo  />
          {!confirmation && ( // Session Page before validation
            <>
              <View style={styles.photoContainer }>
                <ImageBackground
                  style={styles.playgroundPhoto}
                  source={imageSource}
                >
                  <TouchableOpacity style={styles.chatIcon} onPress={() => handleChat()}>
                  <FontAwesome5 name={'comments'} color={"#F0F0F0"} size={26}/>
                  <Text style={styles.chatText}>Game chat</Text>
                  </TouchableOpacity>
                  <Text style={styles.playgroundTextTitle}>
                    {sessionInfos.playground.name},{" "}
                    {sessionInfos.playground.city}
                  </Text>
                </ImageBackground>
              </View>
              <View style={styles.infoContainer}>
                <View>
                  <Text style={GlobalStyles.h3}>Game Time:</Text>
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
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.participantsBox}>
                      <FontAwesome5 name={"users"} color={"#F0F0F0"} size={18} />
                      <Text style={GlobalStyles.text}>
                        {sessionParticipants} / {sessionInfos.maxParticipants}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Modal participants infos */}

                <Modal visible={modalVisible} animationType="slide" transparent={true}>
                  <View style={styles.modal}>
                          <PlayersComponent/>
                  </View>
                </Modal>

                <View style={styles.inputBox}>
                  <View style={styles.ballSection}>
                    <Text style={[GlobalStyles.text, { marginBottom: "8%" }]}>
                      Ma team
                    </Text>
                    <NumericInput
                      totalHeight={35}
                      minValue={hasJoined ? undefined : 1}
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
                      J'apporte un ballon
                    </Text>
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
                {hasJoined && !gameOver ? (
                  <Text style={styles.time}>Tu participes déjà à ce game</Text>
                ) : (
                  <></>
                )}
                {hasJoined && !gameOver ? ( // If already joined, modification only, not new joiner
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <GreyButton
                      title={"Quitter"}
                      width={"45%"}
                      onPress={handleQuit}
                    />
                    <OrangeButton
                      title={"Enregistrer"}
                      width={"45%"}
                      onPress={handleEdit}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {gameOver ? (
                      <Text style={styles.time}>
                        Ce game est maintenant terminé.
                      </Text>
                    ) : (
                      <OrangeButton
                        title={"Participer au game"}
                        width={"80%"}
                        onPress={handleJoin}
                      />
                    )}
                  </View>
                )}
              </View>
            </>
          )}

          {/* CONFETTI RECAP PAGE IF CONFIRMATION */}
          {confirmation && (
            <>
              <View style={styles.confettiContainer}>
                <View style={styles.confettiText}>
                  <View style={styles.logoBox}>
                    <Image
                      source={require("../assets/images/logo_colors.png")}
                      style={styles.logo}
                    />
                  </View>
                  <View style={styles.confirmText}>
                    <Text style={GlobalStyles.h2}>
                      Vous avez rejoint le game !
                    </Text>
                    <Text style={styles.time}>
                      {moment(sessionInfos.date)
                        .format("dddd")
                        .charAt(0)
                        .toUpperCase() +
                        moment(sessionInfos.date).format("dddd").slice(1)}{" "}
                      {moment(sessionInfos.date).format("LL")}, à{" "}
                      {moment(sessionInfos.date).format("LT")}
                    </Text>
                    <Text style={GlobalStyles.text}>
                      {sessionInfos.playground.name},{" "}
                      {sessionInfos.playground.city}
                    </Text>
                  </View>

                  <View style={styles.confettiButtons}>
                    <OrangeButton
                      onPress={() =>
                        navigation.navigate("TabNavigator", {
                          screen: "Session",
                        })
                      }
                      title="Mes sessions"
                      width={"45%"}
                    />
                    <OrangeButton
                      onPress={() => setShowConfetti(false)}
                      title="Créer session"
                      width={"45%"}
                    />
                  </View>
                </View>
                <ConfettiCannon count={300} origin={{ x: -10, y: 0 }} />
              </View>
            </>
          )}
        </View>
      ) : (
        // If sessionInfo is not set
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
    height: (Dimensions.get("window").width * 3) / 5,
    position:"relative"
  },
  chatIcon:{
    position:"absolute",
    top:16,
    right:16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems:"center",
borderRadius:30,
padding:8
  },
  playgroundPhoto: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    paddingBottom: "10%",
  },
  chatText:{
    color: "#F0F0F0",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 4,
    fontSize: 11,
    fontWeight: "700",
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

    marginVertical: "5%",
    marginHorizontal: "8%",
    height: "100%",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 16,
    marginBottom: "2%",
    color: "#FB724C",
    textShadowColor: "rgba(0, 0, 0, 0)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
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
    height: "18%",
  },
  ballSection: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
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
  confettiText: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: "8%",
  },
  logoBox: {
    width: "85%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  confettiButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  logo: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: "contain",
  },
  confirmText: {
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    height: "50%",
    marginTop: "auto",
    backgroundColor: "rgba(59, 59, 59, 1)",
    alignItems:"center",
    paddingBottom: 20
  },
});
