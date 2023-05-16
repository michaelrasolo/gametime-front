import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HeaderLogo from "../components/HeaerLogo";
import OrangeButton from "../components/OrangeButton";
import Inputs from "../components/Inputs";
import PasswordInput from "../components/PasswordInput";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>

    <HeaderLogo />

      <View style={styles.title}>
        <Text style={styles.text}>S'inscrire avec l'email</Text>
      </View>

      <View style={styles.input}>
        <Inputs name="Email" placeholder="Email" height={50} width={"70%"} />
        <Inputs
          name="Téléphone"
          placeholder="Téléphone"
          height={50}
          width={"70%"}
        />
        <PasswordInput
          name="Mot de passe"
          placeholder="Mot de passe"
          height={50}
          width={"70%"}
        />
      </View>

      <View style={styles.button}>
      <OrangeButton
        title="Créer mon compte"
        width={"55%"}
        onPress={() => navigation.navigate("TabNavigator")}
      />
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424"
  },
  input: {
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: "10%"
  },
  text: {
    fontSize: 30,
    color: "#F0F0F0",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    paddingTop: "15%",
  },
  button: {
    alignItems: "center",
    paddingTop: "7%"
  },
});
