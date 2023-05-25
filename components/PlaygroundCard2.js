import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  
} from "react-native";
import OrangeButton from "./OrangeButton";
import { useSelector } from 'react-redux';
import Config from "../config";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const IPAdresse = Config.IPAdresse;

const PlaygroundCard2 = (props) => {
  const user = useSelector((state) => state.user.value);;
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    if (props.isLiked) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [props.isLiked]);
 

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




const sessions =   (props.sessionsNb === 0
  ? "aucun game"
  : props.sessionsNb === 1
  ? "1 game"
  : props.sessionsNb + " games")

const buttonTitle = (props.sessionsNb === 0
  ? "Créer ton game"
  : props.sessionsNb === 1
  ? "Rejoindre"
  :  "Voir les games")

  const handlePressFavorite = () => {
    // console.log(props.id)
    // console.log(user.token)
    console.log(isFavorite)
         if (!isFavorite) {
       fetch(`${IPAdresse}/playgrounds/addFavorite/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playgroundId: props.id,
        token: user.token
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the response data
          setIsFavorite(true);
      })
    } else {
      fetch(`${IPAdresse}/playgrounds/removeFavorite/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playgroundId: props.id,
          token: user.token
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Handle the response data
            setIsFavorite(false);
        })
    }
  }

const handlePress2Favorite = () => {
  fetch(`${IPAdresse}/playgrounds/removeFavorite/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      playgroundId: props.id,
      token: user.token
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle the response data
      if (data.result) {
        setIsFavorite(data.result);
      }
    })
}

const images = {
  playground1: require('../assets/playgrounds/playground1.jpg'),
  playground2: require('../assets/playgrounds/playground2.jpg'),
  playground3: require('../assets/playgrounds/playground3.jpg'),
  playground4: require('../assets/playgrounds/playground4.jpg'),
  playground5: require('../assets/playgrounds/playground5.jpg'),
  playground6: require('../assets/playgrounds/playground6.jpg'),
};

const randomNumber = Math.floor(Math.random() * 6) + 1
const imagePath = `playground${randomNumber}`;
const imageSource = images[imagePath];


  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.card, platformShadow()]}>
      <Image
        style={[styles.image]}
        source={imageSource}
      />
      <View style={styles.favoriteIcon}>
        {isFavorite===true ? (
      <FontAwesome5 style={styles.favoriteIcon} name={"heart-broken"}
      onPress={() => handlePressFavorite()} />
      ) : (
      <FontAwesome5 style={styles.favoriteIcon} name={"heartbeat"}
      onPress={() => handlePressFavorite()} />
      )}
      </View>
      <View style={[styles.gametype, platformShadow()]}>
        <Text>{sessions}</Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.playground}>
          {props.name}, {props.city}
        </Text>
        <View style={styles.bottomBox}>
        <Text style={styles.address}>
          {props.address}
        </Text>
        <OrangeButton title={buttonTitle} onPress={props.onPress} width={"50%"}/>
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
    paddingRight: 4
  },
  address:{
    width:"50%",
    color: "#F0F0F0",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "300",
  }
});

export default PlaygroundCard2;
