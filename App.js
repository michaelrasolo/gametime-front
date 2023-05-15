import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FavoriteScreen from './screens/FavoriteScreen';
import ProfilScreen from './screens/ProfilScreen';
import SearchScreen from './screens/SearchScreen';
import SessionScreen from './screens/SessionScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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
    <Tab.Screen name="Search" component={SearchScreen} />
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
