import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import ViewProfileScreen from "./ViewProfile";
import Config from "../config";

const IPAdresse = Config.IPAdresse;

function PlayersComponent() {
  const navigation = useNavigation()
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  if (selectedUserId) {
    const selectedUser = participantsInfos.find((participant) => participant._id === selectedUserId);
    return <ViewProfileScreen selectedUser={selectedUser} />;
  } else {

  return (
    <View style={styles.global}>
      {participantsInfos.map((participant, index) => (
        <TouchableOpacity key={index} onPress={() => setSelectedUserId(participant._id)}>
            <View style={styles.container}>
                  <Image style={styles.image} source={{ uri: participant.picture }} />

              <View style={styles.name}>
                  <Text style={styles.text}>{participant.nickname}</Text>
              </View>

              <View style={styles.levelAndGenre}>
                  <Text style={styles.text}>{participant.genre}</Text>
                  <Text style={styles.text}>{participant.level}</Text>
              </View>
            </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
}

export default PlayersComponent;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
image: {
  width : "15%",
  height:"90%",
  borderRadius: 99,
},
container: {
  borderWidth: 1,
  height: "30%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
},
name: {
  justifyContent: "center",
  alignItems: "center",
},
levelAndGenre: {
  justifyContent: "center",
  paddingRight: 8
  // alignItems: "flex-end"
},
// imageView: {
//   justifyContent: "center"
// },
global: {
  borderWidth: 2,
  borderColor: "red"
}
})