import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function PasswordInput(props){
    
    const [eyeSlash, setEyeSlash] = useState(false);
    const [iconName, setIconName] = useState('eye-slash');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    function eyeClick(){
        setEyeSlash(!eyeSlash)

        if(eyeSlash === true){
            setSecureTextEntry(false);
            setIconName('eye');
        } else {
            setSecureTextEntry(true);
            setIconName('eye-slash')
        }
    };


    return(
        <View style={[styles.container, { width: props.width, height: props.height } ]}>
            <View style={styles.left}>
                <Text style={styles.text}>{props.name}</Text>
                <TextInput style={styles.input} onChangeText={props.onChangeText} placeholder={props.name} placeholderTextColor='#B0B0B0' secureTextEntry={secureTextEntry}/>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={() => eyeClick()}>
                    <FontAwesome name={iconName} size={16} color='#AEAEB2'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PasswordInput

const styles = StyleSheet.create({
    input: {
        height: 30,
        width: '100%',
        color: "#fff",
      },
      container: {
        height: 50,
        backgroundColor: 'rgba(56, 56, 56, 0.8)',
        borderBottomWidth: 2,
        borderBottomColor: '#B0B0B0',
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:'4%'

      },
      left: {
        justifyContent: 'center',
        paddingLeft: 10,
      },
      right: {
        justifyContent: 'center',
        paddingRight: 7,
      },
      text: {
        color: '#AEAEB2',
        // fontFamily: 'Poppins',
        fontSize: 8,
      }
    });