import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HeaderLogo from "../components/HeaerLogo";
import OrangeButton from "../components/OrangeButton";
import Inputs from '../components/Inputs';
import PasswordInput from '../components/PasswordInput';
import { useState } from "react";
import { login, logout } from '../reducers/user';
import { useDispatch, useSelector } from "react-redux";


export default function SignUpScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [confirmation, setConfirmation] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [nickname, setNickname] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const handleSubmit = () => {
        if (EMAIL_REGEX.test(email)=== false) {
            setEmailError(true)
        } else if (password !== confirmation) {
            setPasswordError(true)
        } else {
            fetch('http://192.168.10.187:3000/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password, nickname: nickname }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        dispatch(login({email: email, password: password, nickname: nickname, token: data.token}));
                    }
                });
                console.log(user)
              navigation.navigate('TabNavigator');
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

        <Inputs
        name="Pseudo" 
        placeholder="Pseudo" 
        height={50} 
        width={"70%"} 
        onChangeText={(value) => setNickname(value)}
        value={nickname}
        />

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

        {passwordError && <Text style={styles.error}>Mot de passe invalide</Text>}

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
