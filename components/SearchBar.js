import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const SearchBar = (props) => {
    return (
<View style={styles.container}>
<TextInput>{props.name}</TextInput>
</View>
    )}


    const styles = StyleSheet.create({
        container: {
            marginTop: 20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          height: 50,
          width: 300,
          backgroundColor:'rgba(56, 56, 56, 0.8)',
          justifyContent:'center',
          alignItems:'center'
        }
      });

export default SearchBar;
