import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';



const RadioButtons = (props) => {
  const [isPressedLeft, setIsPressedLeft] = useState(false);
  const [isPressedMid, setIsPressedMid] = useState(false);
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
	

  // (value === props.leftTitle || props.value === props.leftTitle )

  useEffect(() => {
  if (props.value == props.leftTitle) {
    setIsPressedLeft(true);
      setIsPressedMid(false);
      setIsPressedRight(false)
  } else if (props.value === props.midTitle) {
    setIsPressedLeft(false);
      setIsPressedMid(true);
      setIsPressedRight(false);
  } else if (props.value === props.rightTitle) {
    setIsPressedLeft(false);
      setIsPressedMid(false);
      setIsPressedRight(true);
  }
      // console.log(props.value + ' ' + props.leftTitle)
      
           
}, );


  const handlePress = (value) => {
    if (value === props.leftTitle  ) {
      setIsPressedLeft(true);
      setIsPressedMid(false);
      setIsPressedRight(false);
    } else if (value === props.midTitle) {
      setIsPressedLeft(false);
      setIsPressedMid(true);
      setIsPressedRight(false);
    } else if (value === props.rightTitle) {
      setIsPressedLeft(false);
      setIsPressedMid(false);
      setIsPressedRight(true);
    }
    props.onPress(value);
  };



  
  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={() => handlePress(props.leftTitle)} style={[[styles.UnpressedButtons, isPressedLeft ? styles.pressedButton : styles.UnpressedButtons],platformShadow()]}> 
        <Text  style={[styles.unpressedText, isPressedLeft ? styles.pressedText : styles.unpressedText]} >{props.leftTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => handlePress(props.midTitle)} style={[[styles.UnpressedButtons, isPressedMid ? styles.pressedButton : styles.UnpressedButtons],platformShadow()]} >
        <Text  style={[styles.unpressedText, isPressedMid ? styles.pressedText : styles.unpressedText]} >{props.midTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(props.rightTitle)} style={[styles.UnpressedButtons, isPressedRight ? styles.pressedButton : styles.UnpressedButtons,platformShadow()]} >
        <Text  style={[styles.unpressedText, isPressedRight ? styles.pressedText : styles.unpressedText]} >{props.rightTitle}</Text>
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
        backgroundColor:'#242424',
        // borderWidth:2
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