import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { addPhoto, removePhoto } from "../reducers/user";
import { BlurView } from "expo-blur";

export default function ProfilePicture(props) {
  //   const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const addImage = () => {
    setModalVisible(true);
  };

  const pickImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("image", JSON.stringify(_image));

    if (!_image.canceled) {
      const formData = new FormData();
      formData.append("photoFromFront", {
        uri: _image.assets[0].uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      formData.append("token", user.token);

      fetch("http://192.168.10.175:3000/users/upload", {
        method: "PUT",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(addPhoto(_image.assets[0].uri));
          props.setPicture(_image.assets[0].uri);
          setModalVisible(false);
        });
    }
    console.log(_image);
  };

  const deletePicture = () => {
    fetch("http://192.168.10.175:3000/users/deletePicture", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(removePhoto());
        props.setPicture("");
        setModalVisible(false);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.picture }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
          <Text>{props.picture ? "Edit" : "Upload"} Image</Text>
          <FontAwesome name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onBackdropPress={() => setModalVisible(false)}
      >
        <BlurView style={styles.blurContainer} tint="dark" intensity={100}>
          <TouchableOpacity style={{ flex: 1 }} onPress={closeModal} >
            <View
              style={{
                height: "20%",
                marginTop: "auto",
                backgroundColor: "#515153",
              }}
            >
              <View>
                <View style={styles.topModal}>
                  <View>
                    <Text style={{ fontSize: 25, color: "#F0F0F0" }}>
                      Photo de profil
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.trash}
                      onPress={deletePicture}
                    >
                      <FontAwesome name="trash" size={25} color="#B0B0B0" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.addPicture}>
                  <View style={styles.btnTitle}>
                    <View>
                      <TouchableOpacity
                        style={styles.modalIcon}
                        onPress={props.camera}
                      >
                        <FontAwesome name="camera" size={35} color="#FB724C" />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#F0F0F0",
                          marginLeft: 8,
                        }}
                      >
                        Caméra
                      </Text>
                    </View>
                  </View>
                  <View style={styles.btnTitle}>
                    <View>
                      <TouchableOpacity
                        style={styles.modalIcon}
                        onPress={pickImage}
                      >
                        <FontAwesome name="image" size={35} color="#FB724C" />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#F0F0F0",
                          marginLeft: 12,
                        }}
                      >
                        Galerie
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </BlurView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#515153",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#FB724C",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalIcon: {
    height: 70,
    width: 70,
    borderWidth: 2,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  addPicture: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  topModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 7,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  trash: {
    marginTop: 3,
  },
  blurContainer: {
    position: "absolute",
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
