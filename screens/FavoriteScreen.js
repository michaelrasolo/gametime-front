import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import HeaderNoLogo from '../components/HeaderNoLogo';
import PlaygroundCard from '../components/PlaygroundCardFavorite';
import { useSelector, useDispatch } from 'react-redux';

import Config from "../config";
import { selectedPlayground, emptySelected } from '../reducers/playground';

const IPAdresse = Config.IPAdresse;

export default function FavoriteScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const playground = useSelector((state) => state.playground.value);
  const [playgrounds, setPlaygrounds] = useState([]);
  const dispatch = useDispatch();




  useEffect(() => {
    fetch(`${IPAdresse}/playgrounds/favorites/${user.token}`)
  .then(response => response.json())
  .then(data => {
    if(data.result) {
      setPlaygrounds(data.favoritePlaygrounds)
    }
  });
  }, [playground.selectedPlayground.name]);
 
  const handleChoosePress = (value) => {
    const updatedValue = { ...value, id: value._id }; // Create a new object with the updated key
    dispatch(selectedPlayground(updatedValue)); // 
    navigation.navigate('Search')
  }

  const handleDeletePress = (value) => {
    dispatch(emptySelected(value))
    fetch(`${IPAdresse}/playgrounds/removeFavorite/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playgroundId: value._id,
        token: user.token
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log(data); // Handle the response data
          setPlaygrounds(playgrounds.filter((playground) => playground._id !== value._id))
        }
      })
  }

  const images = {
    playground1: require('../assets/playgrounds/playground1.jpg'),
    playground2: require('../assets/playgrounds/playground2.jpg'),
    playground3: require('../assets/playgrounds/playground3.jpg'),
    playground4: require('../assets/playgrounds/playground4.jpg'),
    playground5: require('../assets/playgrounds/playground5.jpg'),
    playground6: require('../assets/playgrounds/playground6.jpg'),
  };

  console.log("playgrounds", playgrounds);
  const playgroundCards = playgrounds.map((data, i) => {
     const imagePath = `playground${data.photo}`;
     const imageSource = images[imagePath];
    return (
      <PlaygroundCard key={i} height={220}
      source={imageSource}
      name={data.name}
      address={data.address}
      city={data.city}
      onPress={() => handleChoosePress(data)}
      handleDeletePress={() => handleDeletePress(data)}
      />
    );
  });

 return (
   <View style={styles.container}>
     <HeaderNoLogo text={'Mes terrains favoris'}/>
     <View style={styles.content}>
       <View Style={styles.playgroundsSection}>
         <ScrollView>
           {playgroundCards}
         </ScrollView>
       </View>
     </View>
   </View>
  );
}








const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: '#242424',
  

  },
  content: {
    flex:1,
    padding:10,
  },

  playgroundsSection: {
    paddingLeft:10,
    paddingRight:10,
    flex: 1, 
    
  },

})