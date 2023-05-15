import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';



const RadioButtons = () => {
  const [isPressedLeft, setIsPressedLeft] = useState(false);
  const [isPressedMid, setIsPressedMid] = useState(false);
  const [isPressedRight, setIsPressedRight] = useState(false);


  const handlePressLeft = () => {
    setIsPressedLeft(!isPressedLeft);
    setIsPressedMid(false);
    setIsPressedRight(false);
  }

  const handlePressMid = () => {
    setIsPressedLeft(false);
    setIsPressedMid(!isPressedMid);
    setIsPressedRight(false);
  }

  const handlePressRight = () => {
    setIsPressedLeft(false);
    setIsPressedMid(false);
    setIsPressedRight(!isPressedRight);
  }

  // [styles.button, isDisabled ? styles.disabled : null]
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePressLeft()} style={[styles.UnpressedButtons, isPressedLeft ? styles.pressedButton : styles.UnpressedButtons]}> 
        <Text style={[styles.unpressedText, isPressedLeft ? styles.pressedText : styles.unpressedText]} >Rookie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePressMid()} style={[styles.UnpressedButtons, isPressedMid ? styles.pressedButton : styles.UnpressedButtons]} >
        <Text style={[styles.unpressedText, isPressedMid ? styles.pressedText : styles.unpressedText]} >Gamer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePressRight()} style={[styles.UnpressedButtons, isPressedRight ? styles.pressedButton : styles.UnpressedButtons]} >
        <Text style={[styles.unpressedText, isPressedRight ? styles.pressedText : styles.unpressedText]} >All-Star</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
        container: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor:'blue'
      },
      UnpressedButtons : {
        borderRadius: 30,
        backgroundColor : '#383838',
        opacity : 0.8,
        width : '30%',
        height: '50%', 
        alignItems: 'center',
        justifyContent: 'center',
      },
      pressedButton: {
        borderRadius: 30,
        backgroundColor : 'white',
        opacity : 0.8,
        width : '30%',
        height: '50%', 
        alignItems: 'center',
        justifyContent: 'center',
      },
      unpressedText : {
        color : 'white',
      },
      pressedText : {
        color : 'black',
      },
});

export default RadioButtons;