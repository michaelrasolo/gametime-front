import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FavoriteScreen from './screens/FavoriteScreen'
import ProfilScreen from './screens/ProfilScreen';
import SearchScreen from './screens/SearchScreen';
import SessionScreen from './screens/SessionScreen';
import CreateSession from './screens/CreateSession';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ChatScreen from './screens/ChatScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// import storage from 'redux-persist/lib/storage';

import user from './reducers/user';
import playground from './reducers/playground';
import location from './reducers/location';
import game from './reducers/game';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CameraScreen from './screens/CameraScreen';
import ViewProfileScreen from './components/ViewProfile';
import { LogBox } from 'react-native';


const store = configureStore({
 reducer: {user, playground, location, game },
});



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  LogBox.ignoreAllLogs();//Ignore all log notifications

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'Search') {
          iconName = 'search';
        } else if (route.name === 'Create') {
          iconName = 'plus';
        }  else if (route.name === 'Session') {
          iconName = 'basketball-ball';
        } else if (route.name === 'Favorite') {
          iconName = 'heart';
        } else if (route.name === 'Profile') {
          iconName = 'user';
        }
 
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FB724C',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}>
     <Tab.Screen name="Search" component={SearchScreen} options={{unmountOnBlur: true}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}/>
     <Tab.Screen name="Session" component={SessionScreen} options={{unmountOnBlur: true}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}/>
     <Tab.Screen name="Create" component={CreateSession} options={{unmountOnBlur: true}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}/>
     <Tab.Screen name="Favorite" component={FavoriteScreen} options={{unmountOnBlur: true}} listeners={({navigation}) => ({blur: () => navigation.setParams({screen: undefined})})}/>
     <Tab.Screen name="Profile" component={ProfilScreen} />
   </Tab.Navigator>
  );
 }

export default function App() {
  return (

    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
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
