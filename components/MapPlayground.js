// Composant contenant la carte affichant les terrains dans la page création de session
import React from 'react';
import { Image, StyleSheet, Dimensions, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaygroundCard from './PlaygroundCard';
import { selectedPlayground, setPlaygroundList } from '../reducers/playground';
import Config from "../config";
import { useNavigation } from '@react-navigation/native';


const IPAdresse = Config.IPAdresse;

const MapPlayground = (props) => {
  const dispatch = useDispatch()
  const playgrounds = useSelector((state) => state.playground.value); //reducer contenant la liste des terrains à afficher et toutes leurs infos
  const textLocation = useSelector((state) => state.location.value); //reducer contenant la ville tapées dans l'input et les infos de localisation de la ville 

  //états permettant de centrer la map (sur paris par défaut puis avec la localisation de l'utilisateur dans le hook d'effet)
  const [latitude, setLatitude] = useState(48.866667)
  const [longitude, setLongitude] = useState(2.333333)

  const user = useSelector((state) => state.user.value);
  const navigation = useNavigation()

  //Hook d'effet permettant de récupérer la localisation de l'utilisateur à l'ouverture de la carte, de centrer la carte sur l'utilisateur et d'afficher les terrains autour de lui
  useEffect(() => {
    (async () => {
      // Demande de permissions d'accès à la localisation
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        // Obtention de la position actuelle
        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude) // Met à jour la latitude de position sur la carte
        setLongitude(location.coords.longitude) // Met à jour la longitude de position sur la carte
        fetch(`${IPAdresse}/playgrounds/nearby`, {
          //récupère tous les terrains autour de ma position (latitude et longitude)
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            longitude: longitude, latitude: latitude, token: user.token
          }),
        })
          .then(res => res.json())
          .then(data => {
            Promise.all(
              data.map((item) =>
                fetch(`${IPAdresse}/playgrounds/${item._id}`) //récupère le nombre de sessions prévues sur chaque terrain
                  .then((sessionsResponse) => sessionsResponse.json())
                  .then((sessionsData) => {
                    item["sessionsNb"] = sessionsData.sessions.length;
                    return item;
                  })
              )
            )
              .then((updatedData) => {
                const formattedData = updatedData.map(playground => ({
                  ...playground,
                  coordinates: playground.location.coordinates,
                }));
                if (textLocation === null) //On utilise la localisation de l'utilisateur seulement si il n'y rien dans la barre de recherche
                {
                  dispatch(setPlaygroundList(formattedData))
                } //ajoute les terrains récupérés au reducer qui conditionne l'affichage des markers terrains
              }
              )
          })
      }
    })();
  }, [textLocation]); //Permet de relancer la géolicalisation si l'utilisateur efface ce qu'il a écrit dans la barre de recherche




  //fonction permettant de gérer le click sur un marker terrain
  const handleMarker = (value) => {
    //ajoute l'info du terrain sélectionné au reducer et centre la carte sur ce terrain
    const playgroundData = {
      id: value._id,
      name: value.name,
      source: value.photo,
      address: value.address,
      city: value.city,
      sessionsNb: value.sessionsNb
    };

    dispatch(selectedPlayground((playgroundData)))
    setLatitude(value.location.coordinates[1])
    setLongitude(value.location.coordinates[0])
    Keyboard.dismiss()
  }

  //fonction permettant de gérer le click sur le nombre de sessions afin de revoir vers la page Search
  const handleGames = () => {
    props.handleCloseModal()
    navigation.navigate('TabNavigator', { screen: "Search" })
  }

  //icones représentant les terrains sur la carte 
  const images = {
    playgroundWithSessions: require('../assets/images/basketball_hoop_icon.png'),
    playgroundWithoutSession: require('../assets/images/8725379_basketball_hoop_icon.png'),
  };

  //création des markers terrains en se basant sur les données présentes dans le reducer playgrounds
  const markers = playgrounds.playgrounds.length > 0 && playgrounds.playgrounds.map((data, i) => {
    return <Marker
      key={i}
      coordinate={{ latitude: data.location.coordinates[1], longitude: data.location.coordinates[0] }}
      title={data.name}
      onPress={() => handleMarker(data)}
    >
      <Image source={data.sessionsNb === 0 ? images.playgroundWithoutSession : images.playgroundWithSessions} style={{ width: 30, height: 30 }} />
    </Marker>
      ;
  });



  return (
    <>
      {//Affichage de la card terrain (composant) si un terrain est selectionné
        playgrounds.selectedPlayground.name && <PlaygroundCard
          onPressGame={handleGames}
          handleSelect={() => props.handleCloseModal()}
        />}
      <MapView
        // La carte est centrée sur la localisation de l'utilisateur grâce aux états latitude et longitude qui sont setup à l'initialisation de la carte
        // sauf si l'utilisateur tape dans la barre de recherche, auquel cas la localisation de la ville tapée est utilisée via le reducer textLocation
        region={{
          latitude: textLocation ? textLocation.latitude : latitude,
          longitude: textLocation ? textLocation.longitude : longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        style={styles.map}
      >
        {playgrounds.playgrounds && markers}

      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 1.2,
  }
});

export default MapPlayground;