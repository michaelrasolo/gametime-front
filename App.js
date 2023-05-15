import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Inputs from './components/Inputs';

export default function App() {
  return (
    <View style={styles.container}>
      <Inputs name='Name' style={styles.input}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
