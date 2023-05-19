import React, { useState, useEffect } from "react";
import moment from "moment";

import {Button,StyleSheet,Text,View,ScrollView,Image,Dimensions,ImageBackground} from "react-native";
import Inputs from "../components/Inputs";
import HeaderNoLogo from "../components/HeaderNoLogo";
import RadioButtons from "../components/RadioButtons";
import GreyButton from "../components/GreyButton";
import OrangeButton from "../components/OrangeButton";
import DateSearch from "../components/DateSearch";
import { GlobalStyles } from "../components/GlobalStyles";



export default function JoinScreen({ navigation }) {
  const [sessionInfos, setSessionInfos] = useState(null);
  // const [playground, setPlayground] = useState({});

  useEffect(() => {
    fetch(`http://192.168.10.163:3000/sessions/game/6464f4eda9764ac33bf06d40`)
      .then((res) => res.json())
      .then((response) => {
        setSessionInfos(response.sessionData);
        // setPlayground(response.sessionData.playground);

      })
      .catch((error) => {
        console.log("Error fetching session data:", error);
      });
  }, []);
  console.log("outside", sessionInfos);
  return (
    <View style={styles.container}>
      <HeaderNoLogo />
      <View style={styles.photoContainer}>
        <ImageBackground
          style={styles.playgroundPhoto}
          source={require(`../assets/playgrounds/playground3.jpg`)} // Take NUMBER from the fetch
        >
          {/* <Text style={styles.playgroundTextTitle}>{sessionInfos.name}</Text> */}
        </ImageBackground>
      </View>
      <ScrollView style={styles.infoContainer}>
        {sessionInfos && 
        <>
        <Text style={GlobalStyles.h2}>Game Time</Text>
        <Text style={GlobalStyles.text}>{moment(sessionInfos.date).format(' Do MMMM YYYY')}</Text>
        <Text style={GlobalStyles.text}>{moment(sessionInfos.date).format('LT')}</Text>
        <Text style={GlobalStyles.h2}>Adresse</Text>
        <Text style={GlobalStyles.text}>{sessionInfos.playground.address}</Text>
        <Text style={GlobalStyles.text}>{sessionInfos.playground.postCode} {sessionInfos.playground.city}</Text>
        <Text style={GlobalStyles.h2}>Level</Text>
        <Text style={GlobalStyles.text}>{sessionInfos.level}</Text>
        <Text style={GlobalStyles.h2}>Mood</Text>
        <Text style={GlobalStyles.text}>{sessionInfos.mood}</Text>
        <Text style={GlobalStyles.h2}>Type de session</Text>
        <Text style={GlobalStyles.text}>{sessionInfos.sessionType}</Text>
        </> }
        <Text style={GlobalStyles.h2}>Ma team</Text>
        <Inputs/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    borderColor: "red",
    borderWidth: 1,
  },
  photoContainer: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 2) / 3,
  },
  playgroundPhoto: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    padding: 24,
  },
  playgroundText: {
    color: "#F0F0F0",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: 14,
  },
  playgroundTextTitle: {
    color: "#F0F0F0",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontSize: 20,
  },
  infoContainer: {
    flex:1,
    borderColor: "white",
    borderWidth: 1,
    marginHorizontal: "8%",
    marginTop: "8%",
    height: "100%",
  },
});
