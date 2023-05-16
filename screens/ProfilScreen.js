import React from 'react';
import { Button, StyleSheet, Text, View , ScrollView } from 'react-native';
import Inputs from '../components/Inputs';
import HeaderLogo from '../components/HeaerLogo';
import RadioButtons from '../components/RadioButtons';
import GreyButton from '../components/GreyButton';
import OrangeButton from '../components/OrangeButton';

export default function ProfilScreen({ navigation }) {


 return (
   <View style={styles.container}>
     <HeaderLogo />
     <ScrollView>
       <View style={styles.titleSection}>
         <Text style={styles.title}>Mon profil joueur</Text>
       </View>
       <View style={styles.topFields}>
         <View style={styles.fieldSection}>
           <Text style={styles.fieldName}>Pseudo</Text>
           <Inputs />
         </View>
         <View style={styles.fieldSection}>
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
         <Text style={styles.fieldName}>Ton équipe de basket préférée</Text>
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
         <OrangeButton title='Valider' width='50%' />
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