import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const GameCard = () => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        style={styles.image}
        source={require("../assets/images/citystade-marseille.png")}
      />
      <Text style={styles.gametype}>Freestyle</Text>
      <View style={styles.contentBox}>
        <Text style={styles.playground}>Terrain de Basketball Champ de Mars, Paris</Text>
        <Text style={styles.date}>Dimanche 2 juillet, 15h69</Text>
        <View style={styles.bottomBox}>
          <View style={styles.levelBox}>

          <Text style={styles.level}>
            Niveau: <FontAwesome5 name={"circle"}size={18} />
            <FontAwesome5 name={"circle"} size={18}/>
            <FontAwesome5 name={"circle"} size={18}/>
          </Text>
          </View>
          <View style={styles.playersBox}>
            <FontAwesome5 name={"users"} color={"#F0F0F0"} size={18}/>
            <Text style={styles.players}>4 / 6</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// STYLE
const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "30%",
    justifyContent: "flex-start",
    borderRadius: 40,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    position: "relative",
    backgroundColor: "rgba(59, 59, 59, 0.8)",
  },
  image: {
    borderTopRightRadius: 38,
    borderTopLeftRadius: 38,
    width: "100%",
    height: "45%",
  },
  contentBox: {
    flex:1,
    paddingHorizontal: "5%",
    paddingBottom: "2%",
    justifyContent:"space-around",
  },
  gametype: {
    position: "absolute",
    top: "5%",
    left: "10%",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    padding: 3,
    paddingHorizontal: "4%",
    color: "#515153",
  },
  playground: {
    color: "#F0F0F0",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
},
date: {
    color: "#9B9B9B",
    width:"70%"
  },
  level: {
      color: "#F0F0F0",
      marginLeft:"10%"
  },
  players: {
    color: "#F0F0F0",
    marginTop:"3%"
  },
  bottomBox:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  playersBox:{
    justifyContent:"center",
    alignItems:"center",
  },
});

export default GameCard;
