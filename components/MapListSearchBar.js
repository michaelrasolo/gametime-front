import React from 'react';
import { TextInput, Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OrangeButton from './OrangeButton';
import GreyButton from './GreyButton';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlaygroundList } from '../reducers/playground';


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


const MapListSearchBar = (props) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [isPressedLeft, setIsPressedLeft] = useState(true);
  const [isPressedRight, setIsPressedRight] = useState(false);

  const handlePressLeft = () => {

    if (isPressedLeft === false) {
      props.handleMap()
      props.handleList()
    }
    setIsPressedLeft(true);
    setIsPressedRight(false);
  }

  const handlePressRight = () => {
    if (isPressedRight == false) {
      props.handleMap()
      props.handleList()
    }
    setIsPressedLeft(false);
    setIsPressedRight(true);
  }

  const inputRef = useRef(); // cible l'input search du modal pour pouvoir mettre un focus dessus et ouvrir le keyboard directement à l'ouverture du modal

  const handleChange = (value) => {
    setSearchText(value)
    if (value.length > 2) {
      fetch(`http://192.168.10.175:3000/playgrounds/city/${value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          dispatch(setPlaygroundList(data))
        })
    }
  }
  return (

    <SafeAreaView style={styles.container} >
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' && 40 }]} >
        <View style={[styles.inputContainer]}>
          <FontAwesome style={styles.icon} name="search" size={30} color="white" />
          <TextInput
            style={styles.input}
            ref={inputRef}
            onLayout={() => { inputRef.current.focus() }
            }
            placeholder="Saisis ta ville"
            onChangeText={handleChange}
            placeholderTextColor="#242424"
            value={searchText}
          />
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => props.handleCloseModal()}
          >
            <FontAwesome style={styles.icon} name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handlePressLeft()} style={[styles.unpressedButton, isPressedLeft ? styles.pressedButton : styles.unpressedButton, platformShadow()]} >
            <Text style={styles.Text}>Liste</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handlePressRight()} style={[styles.unpressedButton, isPressedRight ? styles.pressedButton : styles.unpressedButton, platformShadow()]} >
            <Text style={styles.Text}>Carte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default MapListSearchBar;


const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 40,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999,
  },
  inputContainer: {
    width: "90%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 50,
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    paddingLeft: 15
  },
  header: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "5%"
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: "white"
  },
  buttonClose: {
    paddingRight: 5,
  },
  icon: {
    marginRight: 10
  },
  buttonContainer: {
    height: 60,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  unpressedButton: {
    width: "48%",
    height: 50,
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  pressedButton: {
    width: "48%",
    height: 50,
    backgroundColor: '#FB724C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  Text: {
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 20
  }

});