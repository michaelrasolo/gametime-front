import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OrangeButton from './components/OrangeButton';
import GreyButton from './components/GreyButton';
import SearchBar from './components/SearchBar';
export default function App() {
  return (
    <View  
    style={styles.container}>
       <SearchBar name="Saisis ta ville"/>
      <OrangeButton title="Valider" width="60%"/>
      {/* <GreyButton title="Valider" width="60%"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:200,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, text : {color:'white'}
});
