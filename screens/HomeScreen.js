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
    // FUNCTION GO TO SIGN UP
    const handleSignUp = () => {
        navigation.navigate('SignUp');
      };

          // FUNCTION GO TO SIGN IN
    const handleSignIn = () => {
        navigation.navigate('SignIn');
      };
//   HOME SCREEN
  return (
    <ImageBackground
      style={[styles.background]}
      source={require("../assets/images/bbackground.gif")}
    >
      <View style={styles.logoBox}>
        <Image
          style={[styles.logo]}
          source={require("../assets/images/logo.png")}
        />
      </View>
      <View style={styles.btnBox}>
        <OrangeButton title="Inscription" width={"70%"} onPress={handleSignUp}/>
        <GreyButton title="Déjà inscrit ?" width={"70%"} onPress={handleSignIn}/>
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
    resizeMode: 'contain'
  },
  btnBox: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
