import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';



const RadioButtons3 = (props) => {
  const [isPressedLeft, setIsPressedLeft] = useState(true);
  const [isPressedRight, setIsPressedRight] = useState(false);


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


  const handlePress = (value) => {
    if (value === props.leftTitle  ) {
      setIsPressedLeft(true);
      setIsPressedRight(false);
    } else if (value === props.rightTitle) {
      setIsPressedLeft(false);
      setIsPressedRight(true);
    }
    props.onPress(value);
  };



  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress(props.leftTitle)} style={[[styles.UnpressedButtons, isPressedLeft ? styles.pressedButton : styles.UnpressedButtons],platformShadow()]}> 
        <Text style={[styles.unpressedText, isPressedLeft ? styles.pressedText : styles.unpressedText]} >{props.leftTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(props.rightTitle)} style={[styles.UnpressedButtons, isPressedRight ? styles.pressedButton : styles.UnpressedButtons,platformShadow()]} >
        <Text style={[styles.unpressedText, isPressedRight ? styles.pressedText : styles.unpressedText]} >{props.rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
        container: {
        flexDirection: 'row',
        width: '100%',
        height: 85,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 1,
        backgroundColor:'#242424'
      },
      UnpressedButtons : {
        borderRadius: 30,
        backgroundColor : 'rgba(56, 56, 56, 0.8)',
        opacity : 0.8,
        width : '45%',
        height: '60%', 
        alignItems: 'center',
        justifyContent: 'center',
      },
      pressedButton: {
        borderRadius: 30,
        backgroundColor : '#FB724C',
        opacity : 0.8,
        width : '45%',
        height: '60%', 
        alignItems: 'center',
        justifyContent: 'center',
      },
      unpressedText : {
        color : 'white',
        fontWeight: '700',
        fontSize: 20,
      },
      pressedText : {
        color : 'white',
        fontWeight: '700',
        fontSize: 20,
      },
});

export default RadioButtons3;