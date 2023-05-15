import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GameCard from './components/GameCard';
import RadioButtons from './components/RadioButtons'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <GameCard  gametype="3X3" city="Marseille" playground="City Stadium de la Verrerie" date="Dimanche 2 juillet 2023" hour="15h78" players="3" maxplayers="9"/>
      <RadioButtons leftTitle='1' midTitle='2'rightTitle='3'/>
      <StatusBar style="auto" />
    </View>
)}

const styles = StyleSheet.create({
  container: {
    padding:16,
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  }, text : {color:'white'},
});
