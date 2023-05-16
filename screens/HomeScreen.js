import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,Platform
} from "react-native";
import Video from "react-native-video";
import OrangeButton from "../components/OrangeButton";
import GreyButton from "../components/GreyButton";

export default function HomeScreen({ navigation }) {
    // SHADOW FUNCTION
    const platformShadow = () => {
        if (Platform.OS === "android") {
          return {}; // Empty object for Android, removing 'elevation'
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
//   HOME SCREEN
  return (
    <ImageBackground
      style={[styles.background]}
      source={require("../assets/images/bbackground.gif")}
    >
      <View style={styles.logoBox}>
        <Image
          style={[styles.logo, platformShadow()]}
          source={require("../assets/images/logo-placeholder.png")}
        />
      </View>
      <View style={styles.btnBox}>
        <OrangeButton title="Inscription" width={"70%"} />
        <GreyButton title="Déjà inscrit ?" width={"70%"} />
      </View>
    </ImageBackground>
  );
}
// STYLES
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  logoBox: {
    width: "100%",
    height: "20%",
    alignItems:"center",
    justifyContent:"center"
  },
  logo: {
    flex: 1,
    aspectRatio: 1.5, 
    resizeMode: 'contain'  },
  btnBox: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
