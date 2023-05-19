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
    const [initialLatitude,setInitialLatitude] = useState(48.390394)
    const [initialLongitude,setInitialLongitude] = useState(-4.486076)

    calculateDistance = (lat1, lon1, lat2, lon2) => {
      // Formule pour calculer la distance entre deux coordonnées géographiques
      const R = 6371; // Rayon de la Terre en km
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
  
      return distance;
    };
  
    deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
       
          if (status === 'granted') {
            Location.watchPositionAsync({ distanceInterval: 10 },
              (location) => {
    setInitialLatitude(location.coords.latitude) 
    setInitialLongitude(location.coords.longitude)
    // fetch(`http://192.168.10.152:3000/playgrounds/${location.coords.latitude}/${location.coords.longitude}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' }
    // })  .then(res => res.json())
    // .then(data => {console.log(data)}
            
    // )
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
          };

            dispatch(selectedPlayground((playgroundData)))
            setLatitude(value.latitude)
            setLongitude(value.longitude)
            
            }
    
    const handleSelect = () => {
        props.handleCloseModal()
    }
    
    const markers = playgrounds.playgrounds && playgrounds.playgrounds.map((data, i) => {
        return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.name} 
        onPress={() => handleMarker(data)} 
        >
          <Image source={require('../assets/images/basketball_hoop_icon.png')} style={{ width: 30, height: 30 }} />
        </Marker>
          ;
      });

  return (
    <>
    {playgrounds.selectedPlayground != "Saisis ta ville" && <PlaygroundCard name={playgrounds.selectedPlayground.name}
    onPress={handleSelect} 
     city={playgrounds.selectedPlayground.city} address={playgrounds.selectedPlayground.address} />}
    <MapView 

      region={{
        latitude: latitude ? latitude : initialLatitude,
        longitude: longitude ? longitude : initialLongitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      style={styles.map}
    >           
     {playgrounds && markers}

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