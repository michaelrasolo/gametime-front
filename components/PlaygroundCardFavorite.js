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
import Icon from "react-native-ionicons";
import OrangeButton from "./OrangeButton";

const PlaygroundCard = (props) => {
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

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.card, platformShadow()]}>
      <Image
        style={[styles.image]}
        // source={require("../assets/images/citystade-marseille.png")}
        source={props.source}
      />
      <View style={styles.deleteIcon}>
      <FontAwesome5 onPress={props.handleDeletePress} name={"heart-broken"} style={styles.deleteIcon} />
      </View>
      <View style={[styles.gametype, platformShadow()]}>
        <Text>Aucun game</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.playground}>
          {props.name}, {props.city}
        </Text>
        
        <View style={styles.bottomBox}>
        <Text style={styles.address}>
          {props.address}
        </Text>
        <OrangeButton title="Choisir" onPress={props.onPress} width={"30%"}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// STYLE
const styles = StyleSheet.create({
  card: {
    width: "100%",
    
    position: "relative",
    height: 200,
    borderRadius: 30,
    margin: 5,
    backgroundColor: "rgba(59, 59, 59, 1)",
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
  deleteIcon : {
    color:'white',
    fontSize:30,
    position: "absolute",
    top: "5%",
    left: "87%",
    color: "#FB724C"
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
    minWidth: 64,
  },
  playground: {
    color: "#F0F0F0",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  address:{
    width:"50%",
    color: "#F0F0F0",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "300",
  }
});

export default PlaygroundCard;
