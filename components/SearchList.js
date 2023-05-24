import React from 'react';
import { Text, ScrollView, Image, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedPlayground } from '../reducers/playground';

const SearchList = (props) => {
  const playgrounds = useSelector((state) => state.playground.value);

  const dispatch = useDispatch()

  const inputRef = useRef(); // cible l'input search du modal pour pouvoir mettre un focus dessus et ouvrir le keyboard directement à l'ouverture du modal

  const handleCard = (value) => {
    dispatch(selectedPlayground({
      id: value._id,
      name: value.name,
      address: value.address,
      city: value.city
    }));
    props.handleMap()
    props.handleList()
  }


  const images = {
    playground1: require('../assets/playgrounds/playground1.jpg'),
    playground2: require('../assets/playgrounds/playground2.jpg'),
    playground3: require('../assets/playgrounds/playground3.jpg'),
    playground4: require('../assets/playgrounds/playground4.jpg'),
    playground5: require('../assets/playgrounds/playground5.jpg'),
    playground6: require('../assets/playgrounds/playground6.jpg'),
  };

  const playgroundList = playgrounds.playgrounds && playgrounds.playgrounds.map((data, i) => {
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
    <View style={styles.container}>
      <View style={styles.searchBarHolder}></View>
      <View style={styles.playgroundList}>
        <ScrollView >
          {playgroundList}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, marginTop:50, marginLeft: 10 },
  playgroundList: {
    height: "90%",
    justifyContent: "flex-start",

  },
  searchBarHolder: {
    height: 120,
    width: "100%"
  },
  playground: {
    flexDirection: "row", justifyContent: "space-around", paddingBottom: 5
  }, image: {
    width: "30%",
    height: 70,
  }, name: { fontWeight: 700 },
  text: { width: "65%" },
  searchInput: {
    marginBottom: 30
  },
});

export default SearchList;