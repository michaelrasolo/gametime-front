import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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

const OrangeButton = ({ title, width, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { width },platformShadow()]}>
      <View style={[styles.button, platformShadow()]}>
        <LinearGradient
          colors={['#FE904B', '#FB724C']}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={styles.gradient}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50  
  },
  button: {
    flex: 1,
    backgroundColor: '#FB724C',
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FCFCFC',
    fontWeight: '700',
    fontSize: 20,
  },
});

export default OrangeButton;
