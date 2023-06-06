// Composant contenant la carte affichant les terrains dans la page création de session
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Image, View, TouchableOpacity, StyleSheet, Dimensions, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaygroundCard2 from './PlaygroundCard2';
import { selectedPlayground, setPlaygroundList } from '../reducers/playground';
import Config from "../config";


const IPAdresse = Config.IPAdresse;

const MapSession = (props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const playgrounds = useSelector((state) => state.playground.value); //reducer contenant la liste des terrains à afficher et toutes leurs infos
  const textLocation = useSelector((state) => state.location.value); //reducer contenant la ville tapées dans l'input et les infos de localisation de la ville 
  const user = useSelector((state) => state.user.value);

  const [selectedMarkerKey, setSelectedMarkerKey] = useState(null); // état contenant la clé du marker sélectionné (pour l'affichage des likes)

  //états permettant de centrer la map (sur paris par défaut puis avec la localisation de l'utilisateur dans le hook d'effet)
  const [latitude, setLatitude] = useState(48.866667)
  const [longitude, setLongitude] = useState(2.333333)

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
              if (textLocation == null)//On utilise la localisation de l'utilisateur seulement si il n'y rien dans la barre de recherche
              { dispatch(setPlaygroundList(formattedData)) } //ajoute les terrains récupérés au reducer qui conditionne l'affichage des markers terrains
            }
            )
          })
      }
    })();
  }, [textLocation]); //Permet de relancer la géolicalisation si l'utilisateur efface ce qu'il a écrit dans la barre de recherche


  //fonction permettant de gérer le click sur un marker terrain
  const handleMarker = (value, markerKey) => {
        //ajoute l'info du terrain sélectionné au reducer et centre la carte sur ce terrain
    const playgroundData = {
      id: value._id,
      source: value.photo,
      name: value.name,
      address: value.address,
      city: value.city,
      sessionsNb: value.sessionsNb,
      isLiked: value.isLiked
    };
    setSelectedMarkerKey(markerKey); // Set the selected marker key
    dispatch(selectedPlayground((playgroundData)))
    setLatitude(value.location.coordinates[1])
    setLongitude(value.location.coordinates[0])
    Keyboard.dismiss()
  }

  //fonction permettant de gérer le click sur un marker terrain
  const handleSelect = () => {
    if (playgrounds.selectedPlayground.sessionsNb === 0) {
      props.handleCloseModal()
      navigation.navigate('TabNavigator', { screen: "Create" });
    } else if (playgrounds.selectedPlayground.sessionsNb === 1) {
      props.handleJoin(true)
    } else {
      props.handleCloseModalWithoutEmpty()
      console.log("test", playgrounds.selectedPlayground.playgroundId)
    }
  }

  //icones représentant les terrains sur la carte 
  const images = {
    playgroundWithSessions: require('../assets/images/basketball_hoop_icon.png'),
    playgroundWithoutSession: require('../assets/images/8725379_basketball_hoop_icon.png'),
  };

  //création des markers terrains en se basant sur les données présentes dans le reducer playgrounds
  const markers = playgrounds.playgrounds.length > 0 && playgrounds.playgrounds.map((data, i) => {
    const markerKey = `marker_${i}`; // Generate a unique key for each marker
    return <Marker
      key={markerKey}
      coordinate={{ latitude: data.location.coordinates[1], longitude: data.location.coordinates[0] }}
      title={data.name}
      onPress={() => handleMarker(data)}
    >
      <Image
        source={data.sessionsNb === 0 ? images.playgroundWithoutSession : images.playgroundWithSessions}
        style={{ width: 30, height: 30 }} />
    </Marker>
      ;
  });

  return (
    <>
      <MapView
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
      {playgrounds.selectedPlayground.name &&
        <PlaygroundCard2
          key={selectedMarkerKey}
          onPress={handleSelect} />}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default MapSession;