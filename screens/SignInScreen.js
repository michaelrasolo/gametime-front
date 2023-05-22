import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HeaderLogo from "../components/HeaerLogo";
import OrangeButton from "../components/OrangeButton";
import Inputs from "../components/Inputs";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import { login } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [idError, setIdError] = useState(false);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleConnection = () => {
    fetch('http://192.168.10.175:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(response => response.json())
        .then(data => {
            if (data.result) {
                console.log(data.result)
                dispatch(login({ email: email, token: data.token }));
                navigation.navigate('TabNavigator')
            } 
            else {setIdError(true)}
        });
};

  return (
    <View style={styles.container}>
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
      <View style={styles.errorBox}>
        {
            idError &&
          <Text style={styles.error}>Identifiants invalides</Text>
        }
      </View>
    </View>

    <View style={styles.button}>
      <OrangeButton
        title="Se connecter"
        width={"55%"}
        onPress={handleConnection}
      />
    </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },
  page: {
    justifyContent:"space-around",
    height:"60%"
},
  input: {
    alignItems: "center",
    paddingVertical: "10%",

  },
  text: {
    fontSize: 30,
    color: "#F0F0F0",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    paddingVertical: "10%",
  },
  button: {
    alignItems: "center",
    paddingTop: "7%",
  },
  errorBox:{
    alignItems:"center",
    justifyContent:"flex-start",
    flexDirection:"row",
    width:"70%",
    marginVertical:12
  },
  error: {
    color: "#FB724C",
    alignItems: "baseline",
  },
});