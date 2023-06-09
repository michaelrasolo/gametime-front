import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,  
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const GameCard = (props,{navigation}) => {
  // SHADOW FUNCTION
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



  //   COLORING BALLS BASED ON LEVEL (3 options)
  const levelBalls = () => {
    switch (props.level) {
      case "Rookies":
        return (
          <View style={styles.ballContainer}>
            <FontAwesome5 name={"basketball-ball"} style={styles.orangeBball} />
            <FontAwesome5 name={"basketball-ball"} style={styles.greyBball} />
            <FontAwesome5 name={"basketball-ball"} style={styles.greyBball} />
          </View>
        );
        break;

      case "Ballers":
        return (
          <View style={styles.ballContainer}>
            <FontAwesome5 name={"basketball-ball"} style={styles.orangeBball} />
            <FontAwesome5 name={"basketball-ball"} style={styles.orangeBball} />
            <FontAwesome5 name={"basketball-ball"} style={styles.greyBball} />
          </View>
        );
        break;

      case "All-Stars":
        return (
          <View style={styles.ballContainer}>
            <FontAwesome5 name={"basketball-ball"} style={styles.orangeBball} />
            <FontAwesome5 name={"basketball-ball"} style={styles.orangeBball} />
            <FontAwesome5 name={"basketball-ball"} style={styles.orangeBball} />
          </View>
        );
        break;

      default:
        // console.log("Invalid level");
        break;
    }
  };
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.8} style={[styles.card, platformShadow(), {height:props.height}]}>
      <Image
        style={[styles.image]}
        // source={require(`../assets/playgrounds/playground${props.playgroundPictureNumber}.jpg`)}
        source={props.source}
      />
      <View style={[styles.sessiontype, platformShadow()]}>
        <Text>{props.sessionType}</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.playground}>
          {props.playground}, {props.city}
        </Text>
        <Text style={styles.date}>
          {props.formattedDate}
        </Text>
        <View style={styles.bottomBox}>
          <View style={styles.levelBox}>
            <Text style={styles.level}>Niveau:</Text>{levelBalls()}
          </View>
          <View style={styles.participantsBox}>
            <FontAwesome5 name={"users"} color={"#F0F0F0"} size={18} />
            <Text style={styles.participants}>
              {props.totalParticipants} / {props.maxParticipants}
            </Text>
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
    height:"40%",
    justifyContent: "flex-start",
    borderRadius: 30,
    position: "relative",
    backgroundColor: "rgba(59, 59, 59, 0.8)",
    marginBottom:"2%"
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
  sessiontype: {
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
    minWidth: 64,
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
  levelBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"center",


    },
    level: {
        color: "#F0F0F0",
        marginRight: 12,
        alignItems:"center"
  },
  participants: {
    color: "#F0F0F0",
    marginTop: "3%",
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  participantsBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  ballContainer: {
    flexDirection: "row",
  },
  orangeBball: {
    fontSize: 24,
    color: "#FB724C",
    marginHorizontal: 5,
  },
  greyBball: {
    fontSize: 24,
    color: "#F0F0F0",
    marginHorizontal: 5,
  },
});

export default GameCard;
