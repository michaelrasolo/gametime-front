import { sliderClasses } from '@mui/material';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
// import SearchBar from '../components/SearchBar';

const SearchList = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const openModal = () => {
        setModalVisible(true);
      };

    // fetch('http://192.168.10.146:3000/playgrounds')
    // .then()
    // .

    return (
        <View>
        <SearchBar name="Saisis ta ville" onChangeText={setModalVisible(!isModalVisible)}/>
        {/* <Modal style={styles.modal} 
        visible={isModalVisible} 
        animationType={slide}
        onRequestClose={() => setModalVisible(false)}>
        </Modal> */}
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex:1},
    modal: {
        flex:1,
        backgroundColor: "#242424"
    }
  });
  
  export default  SearchList 