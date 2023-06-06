//composant contenant la barre de recherche présente sur la carte dans la page recherche de session

import React from 'react';
import { TextInput, Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRef, useState } from 'react';
import { useDispatch, emptySelected } from 'react-redux';
import { setPlaygroundList } from '../reducers/playground';
import Config from "../config";
import { setLocation } from '../reducers/location';

const IPAdresse = Config.IPAdresse;

const MapSearchBar = (props) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  // Gère le changement de texte dans l'input de recherche:
  // - Si l'utilisateur efface le texte dans la barre de recherche (length = 0), on réactive la géolocalisation et vide le reducer
  // - Sinon, on fetch la base de données pour récupérer les playgrounds correspondant à la ville tapée dans l'input
  const handleChange = async (value) => {
    setSearchText(value);
    if (value.length === 0) {
      dispatch(setLocation(null))
      dispatch(emptySelected())
    }
    if (value.length > 2) {
      const response = await fetch(`${IPAdresse}/playgrounds/city/${value}`, { //récupère les terrains de la ville
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();

      const updatedData = await Promise.all(data.map(async (item) => {  //récupère pour chaque terrain le nombre de sessions prévues sur ce terrain (info présente sur la playgroundcard)
        const sessionsResponse = await fetch(`${IPAdresse}/playgrounds/${item._id}`);
        const sessionsData = await sessionsResponse.json();
        item["sessionsNb"] = sessionsData.sessions.length;
        return item;
      }));
      dispatch(setPlaygroundList(updatedData)); //Les terrains correspondant à la ville sont ajouté au reducer qui permet l'affichage dans la liste et la carte
      dispatch(setLocation({ longitude: updatedData[0].location.coordinates[0], latitude: updatedData[0].location.coordinates[1] })) //On prend la latitude et la longitude du premier terrain de la liste pour repositionner la map sur la ville tapée dans l'input

    }
  }
  return (

    <SafeAreaView style={styles.container} >
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' && 40 }]} >
        <View style={[styles.inputContainer]}>
          <FontAwesome style={styles.icon} name="search" size={30} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Saisis ta ville"
            onChangeText={handleChange}
            placeholderTextColor="#242424"
            value={searchText}
          />
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => props.handleCloseModal()}
          >
            <FontAwesome style={styles.icon} name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default MapSearchBar;


const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 40,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999,
  },
  inputContainer: {
    width: "90%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 50,
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    paddingLeft: 15
  },
  header: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "5%"
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: "white"
  },
  buttonClose: {
    paddingRight: 5,
  },
  icon: {
    marginRight: 10
  },


});