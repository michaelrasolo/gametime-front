import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FavoriteScreen from './screens/FavoriteScreen';
import ProfilScreen from './screens/ProfilScreen';
import SearchScreen from './screens/SearchScreen';
import SessionScreen from './screens/SessionScreen';
import CreateSession from './screens/CreateSession';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import JoinScreen from './screens/JoinScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
//import storage from 'redux-persist/lib/storage';
import asyncStorage from "@react-native-async-storage/async-storage";

import user from './reducers/user';
import playground from './reducers/playground';
import game from './reducers/game';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CameraScreen from './screens/CameraScreen';

const reducers = combineReducers({ user, playground, game });

const persistConfig = { key: 'GameTime', blacklist: ["game"], storage: asyncStorage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });

 
const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
     <Tab.Screen name="Search" component={SearchScreen} />
     <Tab.Screen name="Create" component={CreateSession} />
     <Tab.Screen name="Session" component={SessionScreen} />
     <Tab.Screen name="Favorite" component={FavoriteScreen} />
     <Tab.Screen name="Profile" component={ProfilScreen} />
     <Tab.Screen name="Join" component={JoinScreen} />
   </Tab.Navigator>
  );
 }

export default function App() {
  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Join" component={JoinScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Profile" component={ProfilScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
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
