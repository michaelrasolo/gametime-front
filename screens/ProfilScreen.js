import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyleSheet, Text, View , ScrollView, TouchableOpacity } from 'react-native';
import Inputs from '../components/Inputs';
import HeaderLogo from '../components/HeaerLogo';
import RadioButtons from '../components/RadioButtons';
import GreyButton from '../components/GreyButton';
import OrangeButton from '../components/OrangeButton';
import DateSearch from '../components/DateSearch';
import ProfilePicture from '../components/ProfilePicture';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-ionicons";
import { addPhoto, logout } from '../reducers/user';

import Config from "../config";

const IPAdresse = Config.IPAdresse;

export default function ProfilScreen({ navigation }) {
  const [birthdate, setBirthdate] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const [favoritePlayer, setFavoritePlayer] = useState('');
  const [favoriteShoes, setFavoriteShoes] = useState('');
  const [picture, setPicture] = useState('');
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
 
  

  useEffect(() => {
    fetch(`${IPAdresse}/users/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setBirthdate(data.data.birthdate)
        setCity(data.data.city)
        setGender(data.data.gender)
        setLevel(data.data.level)
        setDescription(data.data.description)
        setFavoriteTeam(data.data.favoriteTeam)
        setFavoritePlayer(data.data.favoritePlayer)
        setFavoriteShoes(data.data.favoriteShoes)
        setPicture(data.data.picture)
      });
  }, []);



const handleValidation = () => {
  fetch(`${IPAdresse}/users/update`, {
    method: 'PUT',
    body: JSON.stringify({
      token: user.token,
      picture: picture,
      // birthdate: birthdate,
      city: city,
      gender: gender,
      level: level,
      description: description,
      favoriteTeam: favoriteTeam,
      favoritePlayer: favoritePlayer,
      favoriteShoes: favoriteShoes,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.result){
        dispatch(addPhoto(data.url))
      }
      console.log(data.result)
        navigation.navigate('Search');
    });
}

  
  const handleGenderPress = (value) => {
    setGender(value);
  }

  const handleLevelPress = (value) => {
    setLevel(value);
  }

  const camera = () => {
    navigation.navigate('Camera')
  };

  const handleLogoutPress = () => {
    dispatch(logout());
    navigation.navigate('Home');
  }
  
 return (
   <View style={styles.container}>
     <HeaderLogo />
         <FontAwesome5 name={"sign-out-alt"} style={styles.signOut} />
     <ScrollView contentContainerStyle={{margin:"8%"}}>
       <View style={styles.titleSection}>
         <Text style={styles.title}>Mon profil joueur</Text>
         <TouchableOpacity style={styles.signOutSection} onPress={() => handleLogoutPress()}>
          {/* <Text style={styles.signOutText}>Se déconnecter</Text> */}
         </TouchableOpacity>
         
       </View>
       <View style={styles.picture}>
         <ProfilePicture camera={camera} picture={picture} setPicture={setPicture} />
       </View>
       <View style={styles.topFields}>
         <View style={styles.fieldSection} width='50%'>
           <Text style={styles.fieldName}>Date de naissance </Text>
           <DateSearch onChangeText={(value) => setBirthdate(value)} value={birthdate}/>
         </View>
         <View style={styles.fieldSection} width='50%'>
         <Text style={styles.fieldName}>Ville</Text>
         <Inputs onChangeText={(value) => setCity(value)} value={city}/>
       </View>
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Genre</Text>
         <RadioButtons onPress={handleGenderPress} leftTitle='Homme' midTitle='Femme' rightTitle='Non-binaire' value={gender}/>
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Niveau</Text>
         <RadioButtons onPress={handleLevelPress} leftTitle='Rookie' midTitle='Baller' rightTitle='All-Star' value={level} />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName} >Présente toi en quelques phrases</Text>
         <Inputs onChangeText={(value) => setDescription(value)} value={description}/>
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName} >Ton équipe de basket préférée</Text>
         <Inputs onChangeText={(value) => setFavoriteTeam(value)} value={favoriteTeam}/>
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Ton joueur préféré</Text>
         <Inputs onChangeText={(value) => setFavoritePlayer(value)} value={favoritePlayer}/>
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Ta paire de basket préférée</Text>
         <Inputs onChangeText={(value) => setFavoriteShoes(value)} value={favoriteShoes}/>
       </View>
       <View style={styles.buttonSection}>
        <GreyButton title='Passer' width='43%' onPress={() => navigation.navigate('Search')} />
         <OrangeButton title='Valider' width='43%' onPress={() => handleValidation()} />
       </View>
     </ScrollView>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
     flex:1,
      justifyContent:"flex-start",
      backgroundColor:'#242424',
  },
  topFields : {
    flexDirection: 'row',
  },
  fieldSection: {
    padding: 15,
  },
 titleSection: {
  alignItems: 'flex-start',
  flexDirection: 'row',
 },
 buttonSection: {
  flexDirection: 'row',
  justifyContent : 'space-around',
  paddingTop : 30,
  paddingBottom : 30,
  
  
 },
  title: {
    alignItems:'center',
    color: 'white',
    fontSize: 30,
    padding: 20,
  },
  fieldName: {
    color: 'white',
    fontSize: 17,
    padding: 5,
  },
  picture: {
    alignItems:"center"
  },
  signOutSection:{
    alignItems:'center',
    padding:20,
  },
  signOut: {
    color:'white',
    fontSize:25,
  },
  signOutText : {
    color:'white',
    fontSize:15,
  },
})