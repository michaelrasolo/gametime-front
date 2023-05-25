import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text,Image, View, TouchableOpacity,StyleSheet, Dimensions, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import PlaygroundCard2 from './PlaygroundCard2';
import  { selectedPlayground, setPlaygroundList } from '../reducers/playground';
import Config from "../config";


const IPAdresse = Config.IPAdresse;

const MapSession = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const playgrounds = useSelector((state) => state.playground.value);
    const textLocation = useSelector((state) => state.location.value);
    const user = useSelector((state) => state.user.value);

    const [latitude,setLatitude] = useState(48.866667)
    const [longitude,setLongitude] = useState(2.333333)

    
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
          .then(data => { Promise.all(
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
            if (textLocation == null) {dispatch(setPlaygroundList(formattedData))}
          }
          )})
        }
      })();
    }, []);

    const handleMarker = (value) => {
        const playgroundData = {
            id: value._id,
            source: value.photo,
            name: value.name,
            address: value.address,
            city: value.city,
            sessionsNb : value.sessionsNb,
            isLiked: value.isLiked
          };

            dispatch(selectedPlayground((playgroundData)))
            setLatitude(value.location.coordinates[1])
            setLongitude(value.location.coordinates[0])
            Keyboard.dismiss()
            }
    
    const handleSelect = () => {
      console.log(playgrounds.selectedPlayground.sessionsNb)
      if (playgrounds.selectedPlayground.sessionsNb === 0 ) {
        props.handleCloseModal()
        navigation.navigate('TabNavigator', {screen : "Create"});
      } else if (playgrounds.selectedPlayground.sessionsNb === 1) {
        props.handleJoin(true)
      } else {
        props.handleCloseModal()
        console.log("test",playgrounds.selectedPlayground.id)
      }
    }

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
          <Image 
          source={data.sessionsNb===0 ? images.playgroundWithoutSession : images.playgroundWithSessions} 
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