import React from 'react';
import { Text,Image, View, TouchableOpacity,StyleSheet, Dimensions, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import PlaygroundCard from './PlaygroundCard';
import { selectedPlayground, setPlaygroundList } from '../reducers/playground';
import Config from "../config";
import { useNavigation } from '@react-navigation/native';


const IPAdresse = Config.IPAdresse;

const MapPlayground = (props) => {
    const dispatch = useDispatch()
    const playgrounds = useSelector((state) => state.playground.value);
    const textLocation = useSelector((state) => state.location.value);
    const [latitude,setLatitude] = useState(48.866667)
    const [longitude,setLongitude] = useState(2.333333)
    const user = useSelector((state) => state.user.value);
    const navigation = useNavigation()


    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
   
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude)
          setLongitude(location.coords.longitude)
          fetch(`${IPAdresse}/playgrounds/nearby`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ longitude : longitude, latitude: latitude, token:user.token
            }),
        })
          .then(res => res.json())
          .then(data => { console.log("playgrounds", data)
            Promise.all(
            data.map((item) =>
              fetch(`${IPAdresse}/playgrounds/${item._id}`)
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
              coordinates: playground.location.coordinates, // Access the coordinates property
            }));
              if (textLocation === null) {
                dispatch(setPlaygroundList(formattedData))}
              // }
          }
          )})
        }
      })();
    }, [textLocation]);

    const handleGames = () => {
      props.handleCloseModal()
      navigation.navigate('TabNavigator', {screen : "Search"})
    }

    const handleMarker = (value) => {
        const playgroundData = {
            id: value._id,
            name: value.name,
            source: value.photo,
            address: value.address,
            city: value.city,
            sessionsNb : value.sessionsNb
          };

            dispatch(selectedPlayground((playgroundData)))
            setLatitude(value.location.coordinates[1])
            setLongitude(value.location.coordinates[0])
            Keyboard.dismiss()
            }
    
const buttonTitle = (props.sessionsNb === 0
              ? "Créer"
              : props.sessionsNb === 1
              ? "Rejoindre"
              :  "Voir")


    const images = {
      playgroundWithSessions: require('../assets/images/basketball_hoop_icon.png'),
      playgroundWithoutSession: require('../assets/images/8725379_basketball_hoop_icon.png'),
    };
    
    const markers = playgrounds.playgrounds.length > 0 && playgrounds.playgrounds.map((data, i) => {
        return <Marker 
        key={i} 
        coordinate={{ latitude: data.location.coordinates[1], longitude: data.location.coordinates[0] }}
        title={data.name} 
        onPress={() => handleMarker(data)} 
        >
          <Image source={data.sessionsNb===0 ? images.playgroundWithoutSession : images.playgroundWithSessions} style={{ width: 30, height: 30 }} />
        </Marker>
          ;
      });

  return (
    <>
    {playgrounds.selectedPlayground.name && <PlaygroundCard 
    name={playgrounds.selectedPlayground.name}
    id={playgrounds.selectedPlayground.playgroundId}
    onPressGame={handleGames} 
    handleSelect={() => props.handleCloseModal()}
    city={playgrounds.selectedPlayground.city} 
    address={playgrounds.selectedPlayground.address} 
    sessionsNb={playgrounds.selectedPlayground.sessionsNb}/>}
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
    </>
  );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*1.2,
      }
});

export default MapPlayground;