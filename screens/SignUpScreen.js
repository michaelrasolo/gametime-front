import { Button, StyleSheet, Text, View, KeyboardAvoidingView,
} from "react-native";
import HeaderLogo from "../components/HeaerLogo";
import OrangeButton from "../components/OrangeButton";
import Inputs from '../components/Inputs';
import PasswordInput from '../components/PasswordInput';
import { useState, useEffect } from "react";
import { login, logout } from '../reducers/user';
import { useDispatch, useSelector } from "react-redux";
import Config from "../config";

const IPAdresse = Config.IPAdresse;


export default function SignUpScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [city, setCity] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isEmailValid = EMAIL_REGEX.test(email)

    const handleSubmit = () => {

        setErrorMessages([]);

        console.log(isEmailValid);

        // if (!isEmailValid) {
        //   setErrorMessages((previousErrors) => [...previousErrors, "Adresse mail invalide"]);
        // }
        // if (password !== confirmation) {
        //   setErrorMessages((previousErrors) => [...previousErrors, "Mot de passe invalide"]);
        // }
        // if (email === '') {
        //   setErrorMessages((previousErrors) => [...previousErrors, "Champ email vide"]);
        // }
        // if (city === '') {
        //   setErrorMessages((previousErrors) => [...previousErrors, "Champ ville vide"]);
        // }
        // if (password === '') {
        //   setErrorMessages((previousErrors) => [...previousErrors, "Champ mot de passe vide"]);
        // }
        // if (nickname === '') {
        //   setErrorMessages((previousErrors) => [...previousErrors, "Champ pseudo vide"]);
        // }
        // if (confirmation === '') {
        //   setErrorMessages((previousErrors) => [...previousErrors, "Champ confirmation vide"]);
        // } 
        // else if (errorMessages.length === 0) {
        //     fetch(`${IPAdresse}/users/signup`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ email: email, password: password, nickname: nickname, city: city }),
        //     }).then(response => response.json())
        //         .then(data => {
        //             if (data.result) {
        //                 dispatch(login({city: city, nickname: nickname, token: data.token}));
        //                 console.log(user)
        //             }
        //         });
                dispatch(login({city: "Rouen", nickname: "Toto", token: "Gp2nNlZz6AVJqR1PerpDdgy_hnMu8qas"}));
                navigation.navigate('TabNavigator'); 
                console.log(user)
        // }
      };


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <HeaderLogo />

      <View style={styles.title}>
        <Text style={styles.text}>Inscription</Text>
      </View>

      <View style={styles.input}>
        <Inputs
          name="Email" 
          placeholder="Email" 
          height={50} 
          width={"70%"} 
          onChangeText={(value) => setEmail(value)}
          value={email.trim()}
          />

        {errorMessages.includes("Champ email vide") && (
            <Text style={styles.error}>Champ email vide</Text>)}

          {errorMessages.includes("Adresse mail invalide") && (
            <Text style={styles.error}>Adresse mail invalide</Text>)}

        <Inputs
        name="Pseudo" 
        placeholder="Pseudo" 
        height={50} 
        width={"70%"} 
        onChangeText={(value) => setNickname(value)}
        value={nickname}
        />

        {errorMessages.includes("Champ pseudo vide") && (
                    <Text style={styles.error}>Champ pseudo vide</Text>)}

        <Inputs
        name="Ville" 
        placeholder="Ville" 
        height={50} 
        width={"70%"} 
        onChangeText={(value) => setCity(value)}
        value={city}
        />

        {errorMessages.includes("Champ ville vide") && (
                            <Text style={styles.error}>Champ ville vide</Text>)}

        <PasswordInput
          name="Mot de passe"
          placeholder="Mot de passe"
          height={50}
          width={"70%"}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />

        {errorMessages.includes("Champ mot de passe vide") && (
                            <Text style={styles.error}>Champ mot de passe vide</Text>)}

        <PasswordInput
          name="Confirmation"
          placeholder="Mot de passe"
          height={50}
          width={"70%"}
          onChangeText={(value) => setConfirmation(value)}
          value={confirmation}
        />

          {errorMessages.includes("Champ confirmation vide") && (
                      <Text style={styles.error}>Champ confirmation de mot de passe vide</Text>)}

          {errorMessages.includes("Mot de passe invalide") && (
            <Text style={styles.error}>Mot de passe invalide</Text>)}

      </View>

      <View style={styles.button}>
        <OrangeButton
          title="Créer mon compte"
          width={"55%"}
          onPress={handleSubmit}
        />
      </View>
    </KeyboardAvoidingView>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },
  input: {
    height: "60%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: "5%",
  },
  text: {
    fontSize: 30,
    color: "#F0F0F0",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    paddingTop: "10%",
  },
  button: {
    alignItems: "center",
    paddingTop: "8%",
  },
  error: {
    color: '#FB724C',
    alignItems: "baseline",

  }
})
