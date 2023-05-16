
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HeaderLogo from '../components/HeaerLogo';
import OrangeButton from '../components/OrangeButton';
import Inputs from '../components/Inputs';
import PasswordInput from '../components/PasswordInput';

export default function SignUpScreen({ navigation }) {
 return (
   <View style={styles.container}>
    <View style={styles.header}>
     <HeaderLogo/>
    </View>
    <View>
        <Text style={styles.text}>S'inscrire avec l'email</Text>
    </View>
    <View style={styles.input}>
        <Inputs name='Email' placeholder='Email' height={50} width={"60%"}/>
        <Inputs name='Téléphone' placeholder='Téléphone' height={50} width={"60%"}/>
        <PasswordInput name='Mot de passe' placeholder='Mot de passe' height={50} width={"60%"} />
        <OrangeButton title='Créer mon compte' width={'55%'} onPress={() => navigation.navigate('TabNavigator')}/>
    </View>
    </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    }, 
    header: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    input: {
        height: "70%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    text: {
        fontSize: 25
    }
  });