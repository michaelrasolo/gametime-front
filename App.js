import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FavoriteScreen from './screens/FavoriteScreen';
import ProfilScreen from './screens/ProfilScreen';
import SearchScreen from './screens/SearchScreen';
import SessionScreen from './screens/SessionScreen';
import HomeScreen from './screens/HomeScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'Search') {
          iconName = 'search';
        } else if (route.name === 'Session') {
          iconName = 'basketball-ball';
        } else if (route.name === 'Favorite') {
          iconName = 'heart';
        } else if (route.name === 'Profil') {
          iconName = 'user';
        }
 
        return <FontAwesome5 name={iconName} size={size} color={color} />;
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
  );
 }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
