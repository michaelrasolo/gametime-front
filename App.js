import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RadioButtons from './components/RadioButtons'

export default function App() {
  return (
    <View style={styles.container}>
      <RadioButtons leftTitle='1' midTitle='2'rightTitle='3'/>
      <StatusBar style="auto" />
    </View>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  }, text : {color:'white'}
});
