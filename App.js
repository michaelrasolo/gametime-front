import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OrangeButton from './components/OrangeButton';
import GreyButton from './components/GreyButton';
import SearchBar from './components/SearchBar';
export default function App() {
  return (
    <View  
    style={styles.container}>
      <OrangeButton title="Valider" width="60%"/>
      <GreyButton title="Valider" width="60%"/>
<SearchBar name="saisis ta ville"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  }, text : {color:'white'}
});
