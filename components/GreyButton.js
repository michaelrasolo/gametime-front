import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';

const platformShadow = () => {
  if (Platform.OS === 'android') {
    return {
      elevation: 4, // Android box shadow
    };
  } else if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    };
  }
};

const GreyButton = ({ title, width }) => {
  return (
      <TouchableOpacity  activeOpacity={0.8}   style={[styles.button, platformShadow(),{ width }]} >
      <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  }, text : {
    color: '#FCFCFC',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 20}
});

export default GreyButton;