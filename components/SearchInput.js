import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/fr'
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const SearchInput = (props) => {
  return (
    <View style={[styles.topContainer, { width: props.width }]}>
      <FontAwesome style={styles.icon} name="search" size={30} color="white" />
      <TextInput
        style={styles.input}
        ref={props.ref}
        onLayout={props.onLayout}
        placeholder={props.name}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        placeholderTextColor="#242424"
        value={props.value}
      />
    </View>
  );
};


const styles = StyleSheet.create({

    topContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 50,
        backgroundColor: 'rgba(56, 56, 56, 0.8)',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        width: "100%",
        paddingLeft: 15
    },
    input: {
        flex: 1,
        fontSize: 20,
        color: "white"
    },
    icon: {
        marginRight: 10
    },
    
});


export default SearchInput;
