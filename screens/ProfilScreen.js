import React, { useState } from 'react';
import { Button, StyleSheet, Text, View , ScrollView } from 'react-native';
import Inputs from '../components/Inputs';
import HeaderLogo from '../components/HeaerLogo';
import RadioButtons from '../components/RadioButtons';
import GreyButton from '../components/GreyButton';
import OrangeButton from '../components/OrangeButton';
import DateSearch from '../components/DateSearch';

export default function ProfilScreen({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const [favoritePlayer, setFavoritePlayer] = useState('');
  const [favoriteShoes, setFavoriteShoes] = useState('');
  

 


  const handleValidation = () => {
    const formContent = {
      nickname : nickname,
      birthdate : birthdate,
      gender : gender,
      level : level, 
      description :  description,
      favoriteTeam : favoriteTeam,
      favoritePlayer : favoritePlayer,
      favoriteShoes : favoriteShoes,
    }
    console.log(formContent)
  }
  
  const handleGenderPress = (value) => {
    setGender(value);
  }

  const handleLevelPress = (value) => {
    setLevel(value);
  }

 return (
   <View style={styles.container}>
     <HeaderLogo />
     <ScrollView>
       <View style={styles.titleSection}>
         <Text style={styles.title}>Mon profil joueur</Text>
       </View>
       <View style={styles.topFields}>
         <View style={styles.fieldSection} width='50%'>
           <Text style={styles.fieldName}>Pseudo</Text>
           <Inputs onChangeText={(value) => setNickname(value)}/>
         </View>
         <View style={styles.fieldSection} width='50%'>
           <Text style={styles.fieldName}>Date de naissance </Text>
           <DateSearch onChangeText={(value) => setBirthdate(value)} />
         </View>
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Genre</Text>
         <RadioButtons onPress={handleGenderPress} leftTitle='Homme' midTitle='Femme' rightTitle='Non-binaire' />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Niveau</Text>
         <RadioButtons onPress={handleLevelPress} leftTitle='Rookie' midTitle='Baller' rightTitle='All-Star' />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName} >Présente toi en quelques phrases</Text>
         <Inputs onChangeText={(value) => setDescription(value)} />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName} >Ton équipe de basket préférée</Text>
         <Inputs onChangeText={(value) => setFavoriteTeam(value)} />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Ton joueur préféré</Text>
         <Inputs onChangeText={(value) => setFavoritePlayer(value)} />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Ta paire de basket préférée</Text>
         <Inputs onChangeText={(value) => setFavoriteShoes(value)} />
       </View>
       <View style={styles.buttonSection}>
         <OrangeButton title='Valider' width='50%' onPress={() => handleValidation()} />
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
  alignItems: 'center',
 },
 buttonSection: {
  alignItems: 'flex-end',
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
  


})