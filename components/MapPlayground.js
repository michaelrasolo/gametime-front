import React from 'react';
import { Text,Image, View, TouchableOpacity,StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import PlaygroundCard from './PlaygroundCard';
import { selectedPlayground, setPlaygroundList } from '../reducers/playground';


const MapPlayground = (props ) => {
    const dispatch = useDispatch()
    const playgrounds = useSelector((state) => state.playground.value);
    const [latitude,setLatitude] = useState(null)
    const [longitude,setLongitude] = useState(null)
    const [initialLatitude,setInitialLatitude] = useState(48.866667)
    const [initialLongitude,setInitialLongitude] = useState(2.333333)

    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
       
          if (status === 'granted') {
            Location.getCurrentPositionAsync({ distanceInterval: 10 },
              (location) => {
    setInitialLatitude(location.coords.latitude) 
    setInitialLongitude(location.coords.longitude)
  
    });
          }
        })();
       }, []);

    

   
      
    const handleMarker = (value) => {
  

        const playgroundData = {
            id: value._id,
            name: value.name,
            address: value.address,
            city: value.city,
            sessionsNb : value.sessionsNb
          };

            dispatch(selectedPlayground((playgroundData)))
            setLatitude(value.latitude)
            setLongitude(value.longitude)
            
            }
    
const buttonTitle = (props.sessionsNb === 0
              ? "Créer"
              : props.sessionsNb === 1
              ? "Rejoindre"
              :  "Voir")

    const handleSelect = () => {


        props.handleCloseModal()

    }

    const images = {
      playgroundWithSessions: require('../assets/images/basketball_hoop_icon.png'),
      playgroundWithoutSession: require('../assets/images/8725379_basketball_hoop_icon.png'),
    };
    
    const markers = playgrounds.playgrounds && playgrounds.playgrounds.map((data, i) => {
        return <Marker key={i} coordinate={{ latitude: data.coordinates, longitude: data.coordinates }} title={data.name} 
        onPress={() => handleMarker(data)} 
        >
          <Image source={data.sessionsNb===0 ? images.playgroundWithoutSession : images.playgroundWithSessions} style={{ width: 30, height: 30 }} />
        </Marker>
          ;
      });

  return (
    <>
    {playgrounds.selectedPlayground.name && <PlaygroundCard name={playgrounds.selectedPlayground.name}
    onPress={handleSelect} 
     city={playgrounds.selectedPlayground.city} address={playgrounds.selectedPlayground.address} sessionsNb={playgrounds.selectedPlayground.sessionsNb}/>}
    <MapView 

      region={{
        latitude: latitude ? latitude : initialLatitude,
        longitude: longitude ? longitude : initialLongitude,
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