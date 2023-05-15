import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-ionicons";

const GameCard = (props) => {
  const platformShadow = () => {
    if (Platform.OS === "android") {
      return {
        elevation: 4, // Android box shadow
      };
    } else if (Platform.OS === "ios") {
      return {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      };
    }
  };
  return (
    <TouchableOpacity style={[styles.card, platformShadow()]}>
      <Image
        style={[styles.image]}
        source={require('../assets/images/citystade-marseille.png')}
        />
      <View style={[styles.gametype, platformShadow()]}>
        <Text>{props.gametype}</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.playground}>
          {props.playground}, {props.city}
        </Text>
        <Text style={styles.date}>{props.date}, {props.hour}</Text>
        <View style={styles.bottomBox}>
          <View style={styles.levelBox}>
            <Text style={styles.level}>
              Niveau
              <FontAwesome5 name={"circle"} size={18} color={"#FB724C"} />
              <FontAwesome5 name={"circle"} size={18} color={"#FB724C"} />
              <FontAwesome5 name={"circle"} size={18} color={"#FB724C"} />
            </Text>
          </View>
          <View style={styles.playersBox}>
            <FontAwesome5 name={"users"} color={"#F0F0F0"} size={18} />
            <Text style={styles.players}>{props.players} / {props.maxplayers}</Text>
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
    borderRadius: 30,

    position: "relative",
    backgroundColor: "rgba(59, 59, 59, 0.8)",
  },
  image: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: "100%",
    height: "45%",
  },
  contentBox: {
    flex: 1,
    paddingLeft: "5%",
    paddingVertical: "3%",
    justifyContent: "space-around",
  },
  gametype: {
    position: "absolute",
    top: "5%",
    left: "5%",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    padding: 3,
    paddingHorizontal: "4%",
    color: "#515153",
    alignItems: "center",
    justifyContent: "center",
  },
  playground: {
    color: "#F0F0F0",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  date: {
    color: "#9B9B9B",
    width: "70%",
  },
  level: {
    color: "#F0F0F0",
    marginLeft: "10%",
  },
  players: {
    color: "#F0F0F0",
    marginTop: "3%",
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  playersBox: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameCard;
