import React, { useState } from 'react';
import { Button, StyleSheet, Text, View , ScrollView } from 'react-native';
import Inputs from '../components/Inputs';
import HeaderLogo from '../components/HeaerLogo';
import RadioButtons from '../components/RadioButtons';
import GreyButton from '../components/GreyButton';
import OrangeButton from '../components/OrangeButton';

export default function ProfilScreen({ navigation }) {
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const [favoritePlayer, setFavoritePlayer] = useState('');
  const [favoriteShoes, setFavoriteShoes] = useState('');


  const handleValidation = () => {
    console.log('toto')
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
           <Inputs name='Pseudo'/>
         </View>
         <View style={styles.fieldSection} width='50%'>
           <Text style={styles.fieldName}>Date de naissance </Text>
           <Inputs />
         </View>
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Genre</Text>
         <RadioButtons leftTitle='Homme' midTitle='Femme' rightTitle='Non binaire' />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Niveau</Text>
         <RadioButtons leftTitle='Rookie' midTitle='Baller' rightTitle='All-Star' />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName} >Présente toi en quelques phrases</Text>
         <Inputs />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName} >Ton équipe de basket préférée</Text>
         <Inputs />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Ton joueur préféré</Text>
         <Inputs />
       </View>
       <View style={styles.fieldSection}>
         <Text style={styles.fieldName}>Ta paire de basket préférée</Text>
         <Inputs />
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