import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, StyleSheet, Text, View , ScrollView, TouchableOpacity } from 'react-native';
import Inputs from '../components/Inputs';
import HeaderNoLogo from '../components/HeaderNoLogo';
import RadioButtons from '../components/RadioButtons';
import GreyButton from '../components/GreyButton';
import OrangeButton from '../components/OrangeButton';
import DateSearch from '../components/DateSearch';
import ProfilePicture from '../components/ProfilePicture';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-ionicons";
import { addPhoto, logout } from '../reducers/user';
import { GlobalStyles } from '../components/GlobalStyles';
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
        // console.log(user)
      });
  }, []);



const handleValidation = () => {
  fetch(`${IPAdresse}/users/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
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
        navigation.navigate('Search');
        // dispatch(addPhoto(data.url))
      } else {
        console.log(data)
      }
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
  const logoutIcon = (<FontAwesome5 name={"sign-out-alt"} size={16} />)
  const logoutText = (<Text style={styles.signOutText}> Se déconnecter</Text>)

 return (
   <View style={styles.container}>
     <HeaderNoLogo />
     <ScrollView contentContainerStyle={styles.scrollview}>
       <View style={styles.picture}>
         <ProfilePicture camera={camera} picture={picture} setPicture={setPicture} />
       </View>
       <View style={styles.titleSection}>
       <Text style={styles.username}>@{user.nickname}</Text>
         
       </View>
       <View style={styles.topFields}>
         <View style={styles.fieldSection} width='48%'>
           <Text style={styles.fieldName}>Date de naissance </Text>
           <DateSearch onChangeText={(value) => setBirthdate(value)} value={birthdate}/>
         </View>
         <View style={styles.fieldSection} width='48%'>
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
         <OrangeButton title='Enregistrer' width='80%' onPress={() => handleValidation()} />
        <GreyButton title={[logoutIcon, logoutText]} width='60%' onPress={handleLogoutPress} />
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
  scrollview:{
    margin:"5%",
    // borderWidth:1,
    // borderColor:'blue'
  },username:{
    color: "#F0F0F0",
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 4,
    fontSize: 26,
    margin: "5%",
    fontWeight: "700",
  },
  topFields : {
    flexDirection: 'row',
    // borderColor:"red",
    // borderWidth:1,
    justifyContent:"space-between",
  },
  fieldSection: {
    // borderColor:"red",
    // borderWidth:1
  },
 titleSection: {
  alignItems: 'center',
 },
 buttonSection: {
  justifyContent : 'space-between',
  alignItems:"center",
  height:160,
  paddingTop:'5%',
  paddingBottom:'10%',
  
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
    margin: '2%',
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