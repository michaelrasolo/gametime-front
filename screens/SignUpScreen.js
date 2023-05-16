import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HeaderLogo from "../components/HeaerLogo";
import OrangeButton from "../components/OrangeButton";
import Inputs from '../components/Inputs';
import PasswordInput from '../components/PasswordInput';
import { useState } from "react";
import { login, logout } from '../reducers/user';
import { useDispatch } from "react-redux";


export default function SignUpScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [confirmation, setConfirmation] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const handleSubmit = () => {
        if (EMAIL_REGEX.test(email)) {
          dispatch(login({email: email, password: password}));
          navigation.navigate('TabNavigator');
        } else {
          setEmailError(true);
        }
      };

  return (
    <View style={styles.container}>
      <HeaderLogo />

      <View style={styles.title}>
        <Text style={styles.text}>S'inscrire avec l'email</Text>
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

        {emailError && <Text style={styles.error}>Adresse mail invalide</Text>}

        <PasswordInput
          name="Mot de passe"
          placeholder="Mot de passe"
          height={50}
          width={"70%"}
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <PasswordInput
          name="Confirmation"
          placeholder="Mot de passe"
          height={50}
          width={"70%"}
          onChangeText={(value) => setConfirmation(value)}
          value={confirmation}
        />
      </View>

      <View style={styles.button}>
        <OrangeButton
          title="Créer mon compte"
          width={"55%"}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },
  input: {
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: "10%",
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
    paddingTop: "7%",
  },
  error: {
    color: '#FB724C',
  }
});
