//composant contenant la barre de recherche et les boutons carte et liste lorsqu'on cherche un playground dans la page Création de session

import React from 'react';
import { TextInput, Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaygroundList, emptySelected } from '../reducers/playground';
import { setLocation } from '../reducers/location';
import Config from "../config";

const IPAdresse = Config.IPAdresse;

// Fonction pour définir les styles d'ombre en fonction de la plateforme
const platformShadow = () => {
  if (Platform.OS === 'android') {
    return {
      elevation: 4, // Ombre pour Android
    };
  } else if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    };
  }
};

const MapListSearchBar = (props) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState(''); //état pour stocker l'input tapé dans la barre de recherche
  const [isPressedLeft, setIsPressedLeft] = useState(true); //état permettant de gérer l'affichage de la carte (bouton gauche)
  const [isPressedRight, setIsPressedRight] = useState(false); //état permettant de gérer l'affichage de la liste (bouton droite)

  // Gère le clic sur le bouton "Carte"
  const handlePressLeft = () => {
    if (isPressedLeft === false) {
      props.handleMap() // ouvre ou ferme la carte 
      props.handleList() // ouvre ou ferme la list
      inputRef.current.blur(); // Désélectionne l'input pour perdre le focus
    }
    setIsPressedLeft(true);
    setIsPressedRight(false);
  }

  // Gère le clic sur le bouton "Liste"
  const handlePressRight = () => {
    if (isPressedRight == false) {
      props.handleMap() // ouvre ou ferme la carte 
      props.handleList() // ouvre ou ferme la list
      inputRef.current.focus(); // Sélectionne l'input pour obtenir le focus
    }
    setIsPressedLeft(false);
    setIsPressedRight(true);
  }

  const inputRef = useRef(); // Référence à l'input de recherche pour pouvoir y mettre le focus à l'ouverture de la modale

  // Gère le changement de texte dans l'input de recherche:
  // - Si l'utilisateur efface le texte dans la barre de recherche (length = 0), on réactive la géolocalisation et vide le reducer
  // - Sinon, on fetch la base de données pour récupérer les playgrounds correspondant à la ville tapée dans l'input
  const handleChange = (value) => {
    setSearchText(value);
    if (value.length === 0) 
    { 
      dispatch(setLocation(null));
      dispatch(emptySelected());
    }
    if (value.length > 2)
     { 
      fetch(`${IPAdresse}/playgrounds/city/${value}`, { //récupère les terrains de la ville
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          Promise.all(
            data.map((item) =>
              fetch(`${IPAdresse}/playgrounds/${item._id}`) //Récupère pour chaque terrain le nombre de sessions prévues sur ce terrain (info présente sur la playgroundcard)
                .then((sessionsResponse) => sessionsResponse.json())
                .then((sessionsData) => {
                  item["sessionsNb"] = sessionsData.sessions.length;
                  return item;
                })
            )
          )
            .then((updatedData) => {
              dispatch(setPlaygroundList(updatedData)) //Les terrains correspondant à la ville sont ajouté au reducer qui permet l'affichage dans la liste et la carte
              dispatch(setLocation({ longitude: updatedData[0].location.coordinates[0], latitude: updatedData[0].location.coordinates[1] })) //On prend la latitude et la longitude du premier terrain de la liste pour repositionner la map sur la ville tapée dans l'input
            })
        })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' && 40 }]}>
        <View style={[styles.inputContainer]}>
          <FontAwesome style={styles.icon} name="search" size={30} color="white" />
          <TextInput
            style={styles.input}
            ref={inputRef}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePressLeft()}
            style={[styles.unpressedButton, isPressedLeft ? styles.pressedButton : styles.unpressedButton, platformShadow()]}
          >
            <Text style={styles.Text}>Carte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePressRight()}
            style={[styles.unpressedButton, isPressedRight ? styles.pressedButton : styles.unpressedButton, platformShadow()]}
          >
            <Text style={styles.Text}>Liste</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MapListSearchBar;


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
    paddingLeft: 15,
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
  buttonContainer: {
    height: 60,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  unpressedButton: {
    width: "48%",
    height: 50,
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  pressedButton: {
    width: "48%",
    height: 50,
    backgroundColor: '#FB724C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  Text: {
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 20
  }
});
