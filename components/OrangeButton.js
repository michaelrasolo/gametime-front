import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Fonction pour définir les styles d'ombre en fonction de la plateforme (andoid ou IOS)
const platformShadow = () => {
  if (Platform.OS === 'android') {
    return {
      elevation: 4, // Ombre pour Android
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

// Composant OrangeButton
const OrangeButton = ({ title, width, height, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[styles.container, { width }, platformShadow()]}>
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

// Styles du composant OrangeButton
const styles = StyleSheet.create({
  container: {
    height: 50,
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
