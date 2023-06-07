import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Config from "../config";
import OrangeButton from "./OrangeButton";

const IPAdresse = Config.IPAdresse;

function PlayersComponent(props) {
  const [participantsInfos, setParticipantsInfos] = useState([]);
  const game = useSelector((state) => state.game.value);
  

  useEffect(() => {
    if (game.gameId){
    fetch(`${IPAdresse}/sessions/participants/infos/${game.gameId}`)
      .then((response) => response.json())
      .then((data) => {
        setParticipantsInfos(data.participantsInfos);
      })
      .catch((error) => {
        console.log("Error fetching participant infos:", error);
      });
    }
  }, []);


  return (
    <View style={styles.global}>
      <View style={{alignItems: "center"}}>
        <Text style={styles.modalText}>Participants</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
            {
            participantsInfos.map((participant, index) => (
                  <View key={index} style={styles.container}>

                        <Image style={styles.image} source={{ uri: participant.picture }} />

                    <View style={styles.userBox}>
                        <Text style={styles.title}>{participant.nickname}</Text>
                        <Text style={styles.text}>{participant.gender}</Text>
                        <Text style={styles.text}>{participant.level}</Text>
                    </View>

                    <View style={styles.infoBox}>
                      <View style={{marginBottom:18}}>
                        <Text style={styles.title}>Joueur Préféré</Text>
                        <Text style={styles.text}>{participant.favoritePlayer}</Text>
                      </View>

                      <View>
                        <Text style={styles.title}>Mes chaussures</Text>
                        <Text style={styles.text}>{participant.favoriteShoes}</Text>
                      </View>

                    </View>
                  </View>
            ))
          
            }
            
      </ScrollView>

      <View style={{alignItems: "center", marginTop: 25}}>
        <OrangeButton title="Fermer" onPress={props.onPress} width={'50%'} />
      </View>
    </View>
  );
}
 

export default PlayersComponent;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
image: {
  width : 70,
  height:70,
  borderRadius: 30,
},
container: {
  borderBottomWidth :1,
  borderBottomColor : "white",
  height: Dimensions.get('window').height*0.15,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding : '5%',
  // paddingRight : 8
},
name: {
  justifyContent: "center",
  alignItems: "center",
},
infoBox: {
  justifyContent: "space-around",
  alignItems: "baseline",
  paddingRight: 8,
  width : "40%"
  // alignItems: "flex-end"
},
userBox: {

  // alignItems: "flex-end"
},
// imageView: {
//   justifyContent: "center"
// },
global: {
  height: "100%",
  width: "100%",
  justifyContent: "space-between"
  // marginBottom: 20
},
scroll: {
  // height:"100%",
  marginHorizontal: 20,
},
title : {
  fontWeight:900,
  color:"white"
},

modalText: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#FB724C',
  marginTop: 20,
  paddingBottom: 10
},
})