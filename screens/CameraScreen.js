import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Button } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";

export default function CameraScreen({ navigation }) {

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)

  let cameraRef = useRef(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const takePicture = async () => {
    console.log(user.token);
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    const formData = new FormData();
    formData.append('photoFromFront', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
       });
       formData.append('token', user.token)

       console.log("photo", photo.uri);
  
      const response = await fetch('http://192.168.10.175:3000/users/upload', {
        method: 'PUT',
        body: formData,
       })
       const data = await response.json()
          console.log('data',data)
          dispatch(addPhoto(data.url));
          navigation.navigate('Profile');
    
  }
 
  if (!hasPermission || !isFocused) {
    return <View></View>;
  }

  return (
    <Camera style={styles.container} type={type} flashMode={flash} ref={(ref) => cameraRef = ref} ratio={'16:9'}>

    <View style={styles.topContainer}>
        <View>
          <TouchableOpacity onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
          <FontAwesome name='rotate-right' size={30} color='white' />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => setFlash(flash === FlashMode.off ? FlashMode.torch : FlashMode.off)}>
          <FontAwesome name='flash' size={30} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.snapBtn}>
        <TouchableOpacity onPress={() => takePicture()}>
        <FontAwesome name='circle-thin' size={100} color='white' />
        </TouchableOpacity>
      </View>
   </Camera>
  );
 

  // return (
  //   <View style={styles.container}>
  //     <Text>SnapScreen</Text>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingTop: 50,
    padding: 20,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // width: "100%",
  },
  snapBtn: {
    display: "flex",
    alignItems: "center",
    // width: "100%"
  }
});