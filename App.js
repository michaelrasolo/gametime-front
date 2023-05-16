import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FavoriteScreen from './screens/FavoriteScreen';
import ProfilScreen from './screens/ProfilScreen';
import SearchScreen from './screens/SearchScreen';
import SessionScreen from './screens/SessionScreen';
import HomeScreen from './screens/HomeScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <GameCard  gametype="3X3" city="Marseille" playground="City Stadium de la Verrerie" date="Dimanche 2 juillet 2023" hour="15h78" players="3" maxplayers="9" level="rookie"/>
    //   <RadioButtons leftTitle='1' midTitle='2'rightTitle='3'/>
    //   <StatusBar style="auto" />
    // </View>
<NavigationContainer>
<Tab.Navigator screenOptions={({ route }) => ({
     tabBarIcon: ({ color, size }) => {
       let iconName = '';

       if (route.name === 'Search') {
         iconName = 'search';
       } else if (route.name === 'Session') {
         iconName = 'circle';
       } else if (route.name === 'Favorite') {
         iconName = 'heart';
       } else if (route.name === 'Profil') {
         iconName = 'user';
       }

       return <FontAwesome name={iconName} size={size} color={color} />;
     },
     tabBarActiveTintColor: '#FB724C',
     tabBarInactiveTintColor: 'gray',
     headerShown: false,
   })}>
    <Tab.Screen name="Search" component={HomeScreen} />
    <Tab.Screen name="Session" component={SessionScreen} />
    <Tab.Screen name="Favorite" component={FavoriteScreen} />
    <Tab.Screen name="Profil" component={ProfilScreen} />
  </Tab.Navigator>
</NavigationContainer>
)}

const styles = StyleSheet.create({
  container: {
    padding:16,
    flex: 1,
    paddingTop:200,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'space-between',
  }, text : {color:'white'}
});
