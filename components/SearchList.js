import { sliderClasses } from '@mui/material';
import React from 'react';
import { Modal, SafeAreaView, Text, View, TouchableOpacity,Image,TextInput, StyleSheet,Keyboard } from 'react-native';
import SearchBar from '../components/SearchBar';
import SearchInput from './SearchInput';
import { useState } from 'react';

const SearchList = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [playground, setPlayground] = useState([])

    const handleChange = (value) => {
    console.log(value)
    setSearchText(value)
    fetch(`http://192.168.10.146:3000/playgrounds/city/${value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }})
    .then(res=>res.json())
    .then(data => {
        setPlayground([...data])})
    }
   
    const playgroundList = playground.map((data, i) => {
          const imageSource = { uri: `../assets/playgrounds/playground${data.photo}.jpg` };

        return (
          <View key={i} style={styles.liste}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
         <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.adresse}>{data.adresse}</Text>      
    
          </View>
        );})
      
    return (
        <SafeAreaView>
        <SearchBar name="Saisis ta ville"   onFocus={() => setModalVisible(true)}/>
        <Modal 
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!isModalVisible);
        }}>
        <SafeAreaView style={styles.modal} >
            <SearchInput width={"90%"} name="Saisis ta ville" onChangeText={handleChange} value={searchText}/>
            {playgroundList}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!isModalVisible)}}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>

        </SafeAreaView >
      </Modal>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex:1},
    modal: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
        justifyContent:"flex-start",
        alignItems:"center",
        flex:1,
        backgroundColor: "white"
    },
    liste:{

    }, image: {
        width: 150,
        height: 100,
      },
  }); 
  
  export default  SearchList 