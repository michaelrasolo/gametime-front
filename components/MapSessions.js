import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text,Image, View, TouchableOpacity,StyleSheet, Dimensions, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import PlaygroundCard2 from './PlaygroundCard2';
import playground, { selectedPlayground, setPlaygroundList } from '../reducers/playground';
import Config from "../config";
import MapSearchBar from './MapSearchBar';
import MapListSearchBar from './MapListSearchBar';


const IPAdresse = Config.IPAdresse;

const MapSessions = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const playgrounds = useSelector((state) => state.playground.value);
    const location = useSelector((state) => state.location.value);

    const [latitude,setLatitude] = useState(48.866667)
    const [longitude,setLongitude] = useState(2.333333)
    const [joinVisible, setJoinVisible] = useState(false)


    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
   
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          console.log(location);
          setLatitude(location.coords.latitude)
          setLongitude(location.coords.longitude)
          fetch(`${IPAdresse}/playgrounds/nearby`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ longitude : longitude, latitude: latitude
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
        
            console.log("nearby",formattedData);
            dispatch(setPlaygroundList(formattedData))
          }
          )})
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
            setLatitude(value.location.coordinates[1])
            setLongitude(value.location.coordinates[0])
            Keyboard.dismiss()
            }
    
// const buttonTitle = (props.sessionsNb === 0
//               ? "Créer"
//               : props.sessionsNb === 1
//               ? "Rejoindre"
//               :  "Voir")

    const handleSelect = () => {
      if (playgrounds.selectedPlayground.sessionsNb === 0 ) {
        props.handleCloseModal()
        navigation.navigate('TabNavigator', {screen : "Create"});
      } else if (playgrounds.selectedPlayground.sessionsNb === 1) {
        props.handleCloseModal()
        // setJoinVisible(true)
      } else {
        props.handleCloseModal()
      }
    }

    const images = {
      playgroundWithSessions: require('../assets/images/basketball_hoop_icon.png'),
      playgroundWithoutSession: require('../assets/images/8725379_basketball_hoop_icon.png'),
    };
    
    const markers = playgrounds.playgrounds.length > 0 && playgrounds.playgrounds.map((data, i) => {
        return <Marker key={i} coordinate={{ latitude: data.location.coordinates[1], longitude: data.location.coordinates[0] }} title={data.name} 
        onPress={() => handleMarker(data)} 
        >
          <Image source={data.sessionsNb===0 ? images.playgroundWithoutSession : images.playgroundWithSessions} style={{ width: 30, height: 30 }} />
        </Marker>
          ;
      });

  return (
<>{!joinVisible &&   <>
    {playgrounds.selectedPlayground.name && <PlaygroundCard2 name={playgrounds.selectedPlayground.name}
    onPress={handleSelect} 
     city={playgrounds.selectedPlayground.city} address={playgrounds.selectedPlayground.address} sessionsNb={playgrounds.selectedPlayground.sessionsNb}/>}
    <MapView 

      region={{
        latitude: location ? location.latitude : latitude,
        longitude: location ? location.longitude : longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      style={styles.map}
    >           
     {playgrounds.playgrounds && markers}

    </MapView>
    </>
    }
    {joinVisible && <MapListSearchBar/>}
    </>
  );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*1.2,
      }
});

export default MapSessions;