import { sliderClasses } from '@mui/material';
import React from 'react';
import { Modal, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image, TextInput, StyleSheet, Keyboard } from 'react-native';
import SearchBar from '../components/SearchBar';
import SearchInput from './SearchInput';
import { useState, useRef, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OrangeButton from './OrangeButton';
import GreyButton from './GreyButton';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import {Dimensions} from 'react-native'
import PlaygroundCard from './PlaygroundCard';

const SearchList = () => {
  const [isListVisible, setListVisible] = useState(false);
  const [isMapVisible, setMapVisible] = useState(false);
  const [latitude, setLatitude] = useState(48.866667) 
  const [longitude, setLongitude] = useState(2.333333) 
  const [animation, setAnimation] = useState("slide")
  const [searchText, setSearchText] = useState('');
  const [playgrounds, setPlaygrounds] = useState([])
  const [selectedPlayground, setSelectedPlayground] = useState('Saisis ta ville')
  const [playgroundCity, setPlaygroundCity] = useState('')
  const [playgroundAddress, setPlaygroundAddress] = useState('')
  const [playgroundLatitude, setPlaygroundLatitude] = useState('')
  const [playgroundLongitude, setPlaygroundLongitude] = useState('')

  const inputRef = useRef();

  const handleChange = (value) => {
    setSearchText(value)
    fetch(`http://192.168.10.170:3000/playgrounds/city/${value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setPlaygrounds([...data])
      })
  }

  const handleCard = (value) => {
    setSelectedPlayground(value.name)
    setPlaygroundCity(value.city)
    setPlaygroundAddress(value.address)
    handleOpenMap()
    }

  const handleCloseModal = () => {
    setPlaygrounds([])
    setSearchText('')
    setListVisible(isListVisible && !isListVisible);
    setMapVisible(isListVisible && !isMapVisible)
  }

  const handleOpenMap = () => {
    setAnimation("none")
    setMapVisible(!isMapVisible)
    setListVisible(!isListVisible);
  }

  const handleSelect = () => {
    setMapVisible(!isMapVisible)
  }

  const handleMarker = (data) => {
    return () => {
      setSelectedPlayground(data.name);
      setPlaygroundCity(data.city);
      setPlaygroundAddress(data.address);
    };
  };

  const images = {
    playground1: require('../assets/playgrounds/playground1.jpg'),
    playground2: require('../assets/playgrounds/playground2.jpg'),
    playground3: require('../assets/playgrounds/playground3.jpg'),
    playground4: require('../assets/playgrounds/playground4.jpg'),
    playground5: require('../assets/playgrounds/playground5.jpg'),
    playground6: require('../assets/playgrounds/playground6.jpg'),
  };



  const markers = playgrounds && playgrounds.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.longitude, longitude: data.latitude }} title={data.name} onPress={handleMarker(data)} >
        <Image source={require('../assets/images/basketball_hoop_icon.png')} style={{ width: 30, height: 30}} />
          </Marker>
    ;
  });


  const playgroundList = playgrounds.map((data, i) => {
    const imagePath = `playground${data.photo}`;
    const imageSource = images[imagePath];

    return (
      <TouchableOpacity key={i} style={styles.playground} onPress={() => handleCard(data)}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.text}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.adresse}>{data.address}</Text>
          <Text style={styles.adresse}>{data.city}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView>
      <SearchBar name={selectedPlayground} onPress={() => setListVisible(true)} />
      <Modal
        animationType={animation}
        transparent={true}
        visible={isListVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setListVisible(!isListVisible);
        }}>
        <SafeAreaView style={styles.modal} >
        <View style={styles.header} >
        <View style={[styles.inputContainer]}>
        <FontAwesome style={styles.icon} name="search" size={30} color="white" />
        <TextInput
          style={styles.input}
          ref={inputRef}  
          onLayout={()=> inputRef.current.focus()} 
          placeholder="Saisis ta ville" 
          onChangeText={handleChange} 
          placeholderTextColor="#242424"
          value={searchText} />
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => handleCloseModal()}>
              <FontAwesome style={styles.icon} name="close" size={20} color="white" />
              </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
      <OrangeButton title="Liste"  width={"48%"}/>
      <GreyButton title="Carte" onPress={handleOpenMap} width={"48%"} />
      </View>
      </View>
          <View style={styles.playgroundList}>
          <ScrollView >
            {playgroundList}
          </ScrollView>
          </View>

        </SafeAreaView >
      </Modal>
      <Modal
        animationType={animation}
        transparent={true}
        visible={isMapVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setMapVisible(!isMapVisible);
        }}>
          <View style={styles.modal} >
          <View style={styles.header} >
          <View style={styles.inputContainer}>
        <FontAwesome style={styles.icon} name="search" size={30} color="white" />
        <TextInput
          style={styles.input}
          placeholder="Saisis ta ville" 
          onChangeText={handleChange} 
          placeholderTextColor="#242424"
          value={searchText} />
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => handleCloseModal()}>
              <FontAwesome style={styles.icon} name="close" size={20} color="white" />
              </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
      <GreyButton onPress={handleOpenMap} title="Liste" width={"48%"}/>
      <OrangeButton title="Carte" width={"48%"}/>
      </View>
      </View>
     {selectedPlayground!="Saisis ta ville" && <PlaygroundCard name={selectedPlayground} onPress={handleSelect} city={playgroundCity} address={playgroundAddress} />}
          <MapView
 initialRegion={{
   latitude: 48.390394,
   longitude: -4.486076,
   latitudeDelta: 0.0922,
   longitudeDelta: 0.0421,
 }}
 style={styles.map}
>
{playgrounds && markers}

</MapView>

        </View >

        </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    modal: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  playground: {
    flexDirection: "row", justifyContent: "space-around", paddingBottom: 5
  }, image: {
    width: "30%",
    height: 70,
  }, name: { fontWeight: 700 },
  text: { width: "65%", alignItems: "start" },
  searchInput: {
    marginBottom: 30
  },
  playgroundList:{
    marginTop:"30%", //marginTop afin d'apparaitre en dessous de la barre de recherche et des boutons
    height:"90%"
  },
  inputContainer: {
    width:"90%",
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
mapContainer:{
  
},
input: {
    flex: 1,
    fontSize: 20,
    color: "white"
},
buttonClose: {
paddingRight:5,
},
icon: {
    marginRight: 10
},
buttonContainer:{
  height: 60,
  width:"90%",
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:10
},
map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
}, header :{
  position:"absolute",
   width:"100%",
zIndex:1,  alignItems : "center",
justifyContent : "flex-start",
paddingTop:40, height:"20%"}
});

export default SearchList 