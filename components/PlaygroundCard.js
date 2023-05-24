import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform
} from "react-native";
import OrangeButton from "./OrangeButton";



const PlaygroundCard = (props) => {
  // SHADOW FUNCTION

  const sessions =   (props.sessionsNb === 0 
    ? "Aucun game"
    : props.sessionsNb === 1
    ? "1 game déjà prévu"
    : props.sessionsNb + " games")


  
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

  const handleFavorite = () => {
    console.log('favoris')
  }

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.card, platformShadow()]}>
      <Image
        style={[styles.image]}
        // source={require("../assets/images/citystade-marseille.png")}
        source={props.source}
      />
      <View style={styles.favoriteIcon}>
      <FontAwesome5 onPress={() => handleFavorite()} name={"heart"} style={styles.favoriteIcon} />
      
      </View>
      <View style={[styles.gametype, platformShadow()]}>
        <TouchableOpacity onPress={props.onPressGame}>
        <Text>{sessions}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.playground}>
          {props.name}, {props.city}
        </Text>
        <View style={styles.bottomBox}>
        <Text style={styles.address}>
          {props.address}
        </Text>
        <OrangeButton title="Choisir ce terrain" onPress={props.onPress} width={"50%"}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// STYLE
const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "30%",
    borderRadius: 30,
    bottom:20,
    zIndex:1,
    position: "absolute",
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
  favoriteIcon : {
    color:'white',
    fontSize:30,
    position: "absolute",
    top: "5%",
    left: "85%",
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
    paddingRight: 6
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
