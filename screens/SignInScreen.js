import { Button, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import HeaderLogo from "../components/HeaerLogo";
import OrangeButton from "../components/OrangeButton";
import Inputs from "../components/Inputs";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";
import Config from "../config";

const IPAdresse = Config.IPAdresse;

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [idError, setIdError] = useState(false);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleConnection = () => {
    navigation.navigate('TabNavigator');
    // fetch(`${IPAdresse}/users/signin`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.result) {
    //       console.log(data.result);
    //       dispatch(login({ email: email, token: data.token }));
    //       navigation.navigate('Profile');
    //     } else {
    //       setIdError(true);
    //     }
    //   });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <HeaderLogo />
      <View style={styles.page}>
        <View style={styles.title}>
          <Text style={styles.text}>Connexion</Text>
        </View>

        <View style={styles.input}>
          <Inputs
            name="Email"
            placeholder="Email"
            height={50}
            width={"70%"}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <PasswordInput
            name="Mot de passe"
            placeholder="Ton mot de passe"
            height={50}
            width={"70%"}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          {idError && (
            <View style={styles.errorBox}>
              <Text style={styles.error}>Identifiants invalides</Text>
            </View>
          )}
        </View>

        <View style={styles.button}>
          <OrangeButton
            title="Se connecter"
            width={"55%"}
            onPress={handleConnection}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },
  page: {
    justifyContent: "space-around",
    height: "55%",
    // borderWidth: 2,
    // borderColor: "green",
  },
  input: {
    alignItems: "center",
    justifyContent: "space-around",
    // borderWidth: 2,
    // borderColor: "blue",
    height: "40%",
    flexDirection: "column",
  },
  text: {
    fontSize: 30,
    color: "#F0F0F0",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    // paddingVertical: "10%",
    // borderWidth: 2,
    // borderColor: "red",
  },
  button: {
    alignItems: "center",
    // paddingTop: "7%",
    // borderWidth: 2,
    // borderColor: "yellow",
  },
  errorBox: {
    alignItems: "baseline",
    justifyContent: "flex-start",
    width: "70%",
  },
  error: {
    color: "#FB724C",
    // alignItems: "baseline",
  },
});
